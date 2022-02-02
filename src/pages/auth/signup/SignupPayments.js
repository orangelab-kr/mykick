import { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';
import { StringParam, useQueryParam } from 'use-query-params';
import * as CheckingIcon from '../../../assets/lotties/10075-credit-card-success.json';
import * as ErrorIcon from '../../../assets/lotties/6873-under-maintenance.json';
import * as ReadyIcon from '../../../assets/lotties/68994-success.json';
import * as RegisterIcon from '../../../assets/lotties/86864-card-ubank.json';
import { DepthPage } from '../../../components/DepthPage';
import { GobackLink } from '../../../components/GobackLink';
import { PayWithToss } from '../../../components/PayWithToss';
import { StartedBottom } from '../../../components/started/StartedBottom/StartedBottom';
import { StartedBottomPrimary } from '../../../components/started/StartedBottom/StartedBottomPrimary';
import { StartedBottomSecondary } from '../../../components/started/StartedBottom/StartedBottomSecondary';
import { StartedDescription } from '../../../components/started/StartedDescription';
import { StartedHashtags } from '../../../components/started/StartedHashtags';
import { StartedTitle } from '../../../components/started/StartedTitle';
import { Client } from '../../../tools/client';

export const SignupPayments = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [status] = useQueryParam('status', StringParam);
  const [loading, setLoading] = useState(!!status);
  const onCheckoutClick = async () => {
    setLoading(true);
    Client.get('/cards/checkout').then(({ data }) => {
      window.location.href = data.checkoutUri;
      setLoading(false);
    });
  };

  const onCheckActivated = () => {
    if (status !== 'ACTIVATED') return;
    Client.get('/cards/sync')
      .then(({ data }) => setReady(!!data.card))
      .then(() => setLoading(false));
  };

  const onClick = () => {
    const redirect = localStorage.getItem('mykick-redirect');
    localStorage.removeItem('mykick-redirect');
    navigate(redirect || '/');
  };

  useEffect(onCheckActivated, [status]);
  return (
    <DepthPage>
      <StartedTitle subtitle='토스로 간편하게'>결제</StartedTitle>
      <StartedDescription>등록시, 매월 자동으로 결제됩니다.</StartedDescription>
      <StartedHashtags>#결제도 #간편하게 #마이킥</StartedHashtags>
      <Lottie
        options={{
          loop: !ready,
          animationData: !status
            ? RegisterIcon
            : ready
            ? ReadyIcon
            : status === 'ACTIVATED'
            ? CheckingIcon
            : ErrorIcon,
        }}
        style={{
          margin: '5em 0 0 0',
          height: '60vh',
          pointerEvents: 'none',
        }}
      />

      <StartedBottom>
        {!status ? (
          <StartedBottomPrimary
            description={
              loading
                ? '토스와 연결하는 중입니다'
                : '원클릭으로 간편하게 결제하세요'
            }
            disabled={loading}
            onClick={onCheckoutClick}
          >
            <PayWithToss>토스로 결제하기</PayWithToss>
          </StartedBottomPrimary>
        ) : status === 'ACTIVATED' ? (
          <StartedBottomPrimary
            description={
              loading
                ? '토스에서 정보를 불러오는 중입니다'
                : '토스와 연결이 완료되었습니다.'
            }
            disabled={loading}
            onClick={onClick}
          >
            다음으로
          </StartedBottomPrimary>
        ) : (
          <StartedBottomPrimary
            disabled={true}
            description={'오류가 발생하였습니다. 나중에 다시 시도하세요'}
            color='danger'
          >
            죄송합니다
          </StartedBottomPrimary>
        )}

        <GobackLink>
          <StartedBottomSecondary>뒤로 가기</StartedBottomSecondary>
        </GobackLink>
      </StartedBottom>
    </DepthPage>
  );
};
