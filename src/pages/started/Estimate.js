import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DepthPage } from '../../components/DepthPage';
import { NoStyledLink } from '../../components/NoStyledLink';
import { PayWithToss } from '../../components/PayWithToss';
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
import { useCards } from '../../tools/useCards';
import { useUser } from '../../tools/useUser';

export const Estimate = () => {
  const navigate = useNavigate();
  const user = useUser({ clearCache: true });
  const cards = useCards({ clearCache: true });
  const [loading, setLoading] = useState(true);
  const [estimate, setEstimate] = useState();
  const storage = useStorage('started');
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

  const getEstimate = () => {
    const forms = { addonIds: [], ...storage.get() };
    if (!forms.pricingId) return navigate('/started/pricing');
    Client.post('/rents/estimate', forms)
      .then(({ data }) => setEstimate(data.items))
      .finally(() => setLoading(false));
  };

  const onClick = async () => {
    if (user !== undefined && user === null) {
      localStorage.setItem('mykick-redirect', '/started/estimate');
      navigate('/auth/signup/info');
      return;
    }

    if (cards !== undefined && cards.length <= 0) {
      localStorage.setItem('mykick-redirect', '/started/estimate');
      navigate('/auth/signup/payments');
      return;
    }

    navigate('/started/complete');
  };

  const getNextButtonText = () => {
    if (user !== undefined && user === null) return '가입하기';
    if (cards !== undefined && cards.length <= 0) {
      return <PayWithToss>토스 연결하기</PayWithToss>;
    }

    return '결제하기';
  };

  useEffect(getEstimate, [navigate, storage]);
  return (
    <DepthPage>
      <StartedTitle>견적서</StartedTitle>
      <StartedDescription>확인하고 바로 결제하러 갈까요?</StartedDescription>
      <StartedHashtags>#착한 #가격 #마이킥</StartedHashtags>
      {!loading ? (
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
            <StartedEstimateItem
              description={'배송비'}
              price={16000}
              discountPrice={0}
              optional={'특별 면제 이벤트 중!'}
            />
          </StartedEstimate>
          <StartedEstimateFirstPrice price={firstAddionalPrice} />
        </div>
      ) : (
        <StartedLoading>견적서를 확인하고 있습니다.</StartedLoading>
      )}

      <StartedBottom>
        <StartedIndicator current={3} />
        {!loading && user !== undefined ? (
          <StartedBottomPrimary
            description={`월 ${monthlyPrice.toLocaleString()}원 (배송비 무료)`}
            onClick={onClick}
          >
            {getNextButtonText()}
          </StartedBottomPrimary>
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
