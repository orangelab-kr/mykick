import { Dialog, Rate } from 'antd-mobile';
import { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as ProcessIcon from '../../assets/lotties/79084-process.json';
import * as HappyIcon from '../../assets/lotties/80312-happy-to-update.json';
import { StartedBottom } from '../../components/started/StartedBottom/StartedBottom';
import { StartedBottomPrimary } from '../../components/started/StartedBottom/StartedBottomPrimary';
import { StartedBottomSecondary } from '../../components/started/StartedBottom/StartedBottomSecondary';
import { StartedDescription } from '../../components/started/StartedDescription';
import { StartedHashtags } from '../../components/started/StartedHashtags';
import { StartedIndicator } from '../../components/started/StartedIndicator';
import { StartedTitle } from '../../components/started/StartedTitle';
import { Client } from '../../tools/client';
import { useStorage } from '../../tools/storage';
import { useCards } from '../../tools/useCards';
import { useUser } from '../../tools/useUser';

export const AskRate = styled(StartedBottomSecondary)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

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

export const StartedComplete = () => {
  const navigate = useNavigate();
  const [rent, setRent] = useState();
  const [loading, setLoading] = useState(true);
  const user = useUser({ clearCache: true });
  const cards = useCards({ clearCache: true });
  const storage = useStorage('started');

  const requestEstimate = () => {
    if (!user || !cards) return;
    const form = { ...storage.get() };
    form.cardId = cards[0].cardId;
    form.name = `${user.name}님의 마이킥`;
    storage.setAll({});
    Client.post('/rents', form)
      .then(({ data }) => {
        setRent(data.rent);
        setLoading(false);
      })
      .catch((err) => {
        const content = (
          <>
            <FailedWarningTitle>죄송합니다.</FailedWarningTitle>
            <FailedContent>{err.message}</FailedContent>
            <FailedAsk>다시 시도하시겠습니까?</FailedAsk>
          </>
        );

        Dialog.confirm({
          content,
          confirmText: '다시 시도',
          cancelText: '아니요',
        }).then((confirm) => confirm && navigate('/'));
      });
  };

  const onClick = () => navigate(`/rents/${rent.rentId}/status`);
  useEffect(requestEstimate, [cards, navigate, storage, user]);
  return (
    <div>
      <StartedTitle>{loading ? '신청 중...' : '신청 완료'}</StartedTitle>
      <StartedDescription>
        {loading ? '잠시만 기다려주세요.' : '신청이 완료되었습니다.'}
      </StartedDescription>
      <StartedHashtags>#신청도 #빠르게 #마이킥</StartedHashtags>
      <Lottie
        options={{
          loop: loading,
          animationData: loading ? ProcessIcon : HappyIcon,
        }}
        style={{
          margin: '5em 0 0 0',
          height: '60vh',
          pointerEvents: 'none',
        }}
      />
      <StartedBottom>
        <StartedIndicator current={4} />
        <StartedBottomPrimary
          disabled={loading}
          description='영업일 기준 24시간내로 전화드립니다.'
          onClick={onClick}
        >
          신청 상태보기
        </StartedBottomPrimary>
        <AskRate>
          신청이 간편하셨나요?
          <Rate />
        </AskRate>
      </StartedBottom>
    </div>
  );
};
