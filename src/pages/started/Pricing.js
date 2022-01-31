import { NoStyledLink } from '../../components/NoStyledLink';
import { StartedBottom } from '../../components/started/StartedBottom/StartedBottom';
import { StartedBottomPrimary } from '../../components/started/StartedBottom/StartedBottomPrimary';
import { StartedBottomSecondary } from '../../components/started/StartedBottom/StartedBottomSecondary';
import { StartedDescription } from '../../components/started/StartedDescription';
import { StartedHashtags } from '../../components/started/StartedHashtags';
import { StartedIndicator } from '../../components/started/StartedIndicator';
import { StartedPricingList } from '../../components/started/StartedPricing/StartedPricingList';
import { StartedTitle } from '../../components/started/StartedTitle';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import { useState } from 'react';
import { DepthPage } from '../../components/DepthPage';
import { useEffect } from 'react';
import { useStorage } from '../../tools/storage';

export const Pricing = () => {
  const [pricing, setPricing] = useState();
  const storage = useStorage('started');

  useEffect(() => {
    storage.set('pricingId', pricing && pricing.pricingId);
  }, [pricing, storage]);

  return (
    <DepthPage>
      <StartedTitle>상품</StartedTitle>
      <StartedDescription>먼저, 상품을 선택해볼까요?</StartedDescription>
      <StartedHashtags>#원하는 #만큼만 #마이킥</StartedHashtags>
      <StartedPricingList
        selectedPricing={pricing}
        setPricing={setPricing}
        initialPricingId={storage.get('pricingId')}
      />
      <StartedBottom>
        <StartedIndicator current={0} />
        {pricing ? (
          <NoStyledLink to='/started/mysafe'>
            <StartedBottomPrimary
              description={`월 ${pricing.monthlyPrice.toLocaleString()}원`}
            >
              이어서 진행해볼까요?
            </StartedBottomPrimary>
          </NoStyledLink>
        ) : (
          <StartedBottomPrimary
            description='나에게 맞는 상품을 선택해보세요.'
            disabled
          >
            상품을 먼저 선택해주세요.
          </StartedBottomPrimary>
        )}

        <NoStyledLink to='/auth/login'>
          <StartedBottomSecondary>
            이미 <Logo style={{ height: '.8em' }} /> 을 갖고 계신가요?
          </StartedBottomSecondary>
        </NoStyledLink>
      </StartedBottom>
    </DepthPage>
  );
};
