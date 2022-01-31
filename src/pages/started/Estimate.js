import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { DepthPage } from '../../components/DepthPage';
import { NoStyledLink } from '../../components/NoStyledLink';
import { StartedBottom } from '../../components/started/StartedBottom/StartedBottom';
import { StartedBottomPrimary } from '../../components/started/StartedBottom/StartedBottomPrimary';
import { StartedBottomSecondary } from '../../components/started/StartedBottom/StartedBottomSecondary';
import { StartedDescription } from '../../components/started/StartedDescription';
import { StartedEstimate } from '../../components/started/StartedEstimate/StartedEstimate';
import { StartedEstimateFirstPrice } from '../../components/started/StartedEstimate/StartedEstimateFirstPrice';
import { StartedEstimateItem } from '../../components/started/StartedEstimate/StartedEstimateItem';
import { StartedHashtags } from '../../components/started/StartedHashtags';
import { StartedIndicator } from '../../components/started/StartedIndicator';
import { StartedLoading } from '../../components/started/StartedLoading';
import { StartedTitle } from '../../components/started/StartedTitle';
import { Client } from '../../tools/client';
import { useStorage } from '../../tools/storage';

export const Estimate = () => {
  const [loading, setLoading] = useState(true);
  const [estimate, setEstimate] = useState();
  const monthlyPrice = useMemo(() => {
    if (!estimate) return 0;
    const monthlyItems = _.filter(estimate, (item) => item.type === 'Monthly');
    const monthlyAmounts = _.map(monthlyItems, (item) => item.amount);
    return _.sum(monthlyAmounts);
  }, [estimate]);
  const firstAddionalPrice = useMemo(() => {
    if (!estimate || !monthlyPrice) return 0;
    const thisMonthPrice = _.sum(_.map(estimate, (item) => item.amount));
    return thisMonthPrice - monthlyPrice;
  }, [estimate, monthlyPrice]);

  const storage = useStorage('started');

  const getEstimate = () => {
    Client.post('/rents/estimate', storage.get())
      .then(({ data }) => setEstimate(data.items))
      .finally(() => setLoading(false));
  };

  useEffect(getEstimate, [storage]);
  return (
    <DepthPage>
      <StartedTitle>견적서</StartedTitle>
      <StartedDescription>확인하고 바로 결제하러 갈까요?</StartedDescription>
      <StartedHashtags>#착한 #가격 #마이킥</StartedHashtags>
      <StartedLoading loading={loading}>
        견적서를 확인하고 있습니다.
      </StartedLoading>
      {!loading && (
        <div>
          <StartedEstimate price={monthlyPrice}>
            {estimate.map((item) => (
              <StartedEstimateItem
                key={item.name}
                description={item.name}
                price={item.amount}
                optional={item.type === 'Onetime' ? '첫 달만' : ''}
              />
            ))}
          </StartedEstimate>
          <StartedEstimateFirstPrice price={firstAddionalPrice} />
        </div>
      )}
      <StartedBottom>
        <StartedIndicator current={3} />
        {!loading ? (
          <NoStyledLink to='/auth/signup/info'>
            <StartedBottomPrimary
              description={`월 ${monthlyPrice.toLocaleString()}원 (배송비 무료)`}
            >
              진행하기
            </StartedBottomPrimary>
          </NoStyledLink>
        ) : (
          <StartedBottomPrimary description='잠시만 기다려주세요.'>
            견적을 조회하고 있습니다.
          </StartedBottomPrimary>
        )}

        <NoStyledLink to='/'>
          <StartedBottomSecondary>나중에 다시하기</StartedBottomSecondary>
        </NoStyledLink>
      </StartedBottom>
    </DepthPage>
  );
};
