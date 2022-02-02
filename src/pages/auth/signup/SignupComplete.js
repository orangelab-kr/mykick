import { AutoCenter, Dialog } from 'antd-mobile';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';
import { DepthPage } from '../../../components/DepthPage';
import { GobackLink } from '../../../components/GobackLink';
import { StartedBottom } from '../../../components/started/StartedBottom/StartedBottom';
import { StartedBottomPrimary } from '../../../components/started/StartedBottom/StartedBottomPrimary';
import { StartedBottomSecondary } from '../../../components/started/StartedBottom/StartedBottomSecondary';
import { StartedDescription } from '../../../components/started/StartedDescription';
import { StartedHashtags } from '../../../components/started/StartedHashtags';
import { StartedIndicator } from '../../../components/started/StartedIndicator';
import { StartedTitle } from '../../../components/started/StartedTitle';
import * as register from '../../../assets/lotties/38435-register.json';
import * as greeting from '../../../assets/lotties/36125-greeting-animation-for-call-to-action.json';
import { useCallback, useEffect, useState } from 'react';
import { useStorage } from '../../../tools/storage';
import { Client } from '../../../tools/client';
import styled from 'styled-components';

const FailedWarningTitle = styled.div`
  font-size: 18px;
  font-weight: 800;
`;

const FailedContent = styled.div`
  margin: 0.8em 0;
  font-size: 16px;
`;

const FailedAsk = styled.div`
  color: red;
`;

export const SignupComplete = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const storage = useStorage('signup');

  const onSignup = useCallback(async () => {
    try {
      const form = storage.get();
      const options = { alert: false };
      const { data } = await Client.post('/auth/signup', form, options);
      localStorage.setItem('mykick-token', data.token);
      storage.setAll({});
      setUser(data.user);
      setLoading(false);
    } catch (err) {
      const content = (
        <>
          <FailedWarningTitle>죄송합니다.</FailedWarningTitle>
          <FailedContent>{err.message}</FailedContent>
          <FailedAsk>다시 시도하시겠습니까?</FailedAsk>
        </>
      );

      const confirm = await Dialog.confirm({
        content,
        confirmText: '다시 시도',
        cancelText: '아니요',
      });

      if (confirm) navigate('/auth/signup');
    }
  }, [navigate, storage]);

  const onClick = () => {
    const redirect = localStorage.getItem('mykick-redirect');
    localStorage.removeItem('mykick-redirect');
    navigate(redirect);
  };

  useEffect(onSignup, [onSignup]);
  return (
    <DepthPage>
      <StartedTitle>가입하기</StartedTitle>
      <StartedDescription>
        {loading ? '가입을 완료하는 중입니다.' : `${user.name}님 반갑습니다.`}
      </StartedDescription>
      <StartedHashtags>#개인정보도 #안전하게 #마이킥</StartedHashtags>
      <AutoCenter style={{ overflow: 'hidden' }}>
        <Lottie
          options={{ animationData: loading ? register : greeting }}
          style={{ margin: '5em 0 0 0', pointerEvents: 'none' }}
        />
      </AutoCenter>
      <StartedBottom>
        <StartedIndicator current={3} />
        <StartedBottomPrimary
          description={loading ? '잠시만 기다려주세요.' : '이어서 진행하기'}
          disabled={loading}
          onClick={onClick}
        >
          반가워요!
        </StartedBottomPrimary>
        <GobackLink>
          <StartedBottomSecondary>뒤로 가기</StartedBottomSecondary>
        </GobackLink>
      </StartedBottom>
    </DepthPage>
  );
};
