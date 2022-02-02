import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import Lottie from 'react-lottie';
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
import * as ProcessIcon from '../../assets/lotties/79084-process.json';
import * as HappyIcon from '../../assets/lotties/80312-happy-to-update.json';
import { Rate } from 'antd-mobile';
import styled from 'styled-components';

export const AskRate = styled(StartedBottomSecondary)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const StartedComplete = () => {
  const navigate = useNavigate();
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
    Client.post('/rents', form).then(({ data }) => {
      console.log(data.rent);
      setLoading(false);
    });
  };

  useEffect(requestEstimate, [cards, storage, user]);
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
        <StartedIndicator current={3} />
        <StartedBottomPrimary
          disabled={loading}
          description={'마이킥을 선택해주셔서 감사합니다'}
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
