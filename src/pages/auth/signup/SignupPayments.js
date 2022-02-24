import { Form } from 'antd-mobile';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StringParam, useQueryParam } from 'use-query-params';
import { DepthPage } from '../../../components/DepthPage';
import { PaymentCard } from '../../../components/payments/Card/PaymentCard';
import { PaymentCardButton } from '../../../components/payments/Card/PaymentCardButton';
import { PaymentToss } from '../../../components/payments/Toss/PaymentToss';
import { PaymentTossButton } from '../../../components/payments/Toss/PaymentTossButton';
import { StartedBottom } from '../../../components/started/StartedBottom/StartedBottom';
import { StartedBottomSecondary } from '../../../components/started/StartedBottom/StartedBottomSecondary';
import { StartedDescription } from '../../../components/started/StartedDescription';
import { StartedHashtags } from '../../../components/started/StartedHashtags';
import { StartedTitle } from '../../../components/started/StartedTitle';

export const SignupPayments = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [status] = useQueryParam('status', StringParam);
  const [cardMode, setCardMode] = useState(false);
  const [form] = Form.useForm();

  const onNext = () => {
    const redirect = localStorage.getItem('mykick-redirect');
    localStorage.removeItem('mykick-redirect');
    navigate(redirect || '/');
  };

  return (
    <DepthPage>
      <StartedTitle subtitle='카드 연결도 간편하게'>결제</StartedTitle>
      <StartedDescription>등록시, 매월 자동으로 결제됩니다.</StartedDescription>
      <StartedHashtags>#결제도 #간편하게 #마이킥</StartedHashtags>
      {cardMode ? (
        <PaymentCard form={form} />
      ) : (
        <PaymentToss ready={ready} status={status} />
      )}

      <StartedBottom>
        {cardMode ? (
          <PaymentCardButton
            form={form}
            ready={ready}
            setReady={setReady}
            onNext={onNext}
          />
        ) : (
          <PaymentTossButton
            status={status}
            setReady={setReady}
            onNext={onNext}
          />
        )}

        <StartedBottomSecondary onClick={() => setCardMode((mode) => !mode)}>
          {cardMode ? '토스로 결제하기' : '신용/체크카드로 결제하기'}
        </StartedBottomSecondary>
      </StartedBottom>
    </DepthPage>
  );
};
