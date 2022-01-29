import { useEffect } from 'react';
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
import { useToggle } from '../../tools/useToggle';

export const Estimate = () => {
  const [loading, setLoading] = useToggle(true);
  useEffect(() => setTimeout(setLoading(false), 2000));

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
          <StartedEstimate price={37000}>
            <StartedEstimateItem description='킥보드 대여' price={37000} />
            <StartedEstimateItem
              description='헬멧 구매'
              price={15000}
              optional='1회'
            />
            <StartedEstimateItem description='마이세이프' price={37000} />
            <StartedEstimateItem
              description='마이케어'
              price={15000}
              optional='선결제'
            />
            <StartedEstimateItem
              description='마이케어'
              price={15000}
              optional='선결제'
            />
            <StartedEstimateItem
              description='마이케어'
              price={15000}
              optional='선결제'
            />
            <StartedEstimateItem
              description='마이케어'
              price={15000}
              optional='선결제'
            />
          </StartedEstimate>
          <StartedEstimateFirstPrice price={3000} />
        </div>
      )}
      <StartedBottom>
        <StartedIndicator current={3} />
        {!loading ? (
          <NoStyledLink to='/auth/signup'>
            <StartedBottomPrimary description='월 16,000원 (배송비 무료)'>
              내 정보 입력하기
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
