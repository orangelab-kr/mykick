import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import { DepthPage } from '../../components/DepthPage';
import { StartedBottom } from '../../components/started/StartedBottom/StartedBottom';
import { StartedBottomPrimary } from '../../components/started/StartedBottom/StartedBottomPrimary';
import { StartedBottomSecondary } from '../../components/started/StartedBottom/StartedBottomSecondary';
import { StartedDescription } from '../../components/started/StartedDescription';
import { StartedHashtags } from '../../components/started/StartedHashtags';
import { StartedIndicator } from '../../components/started/StartedIndicator';
import { StartedMySafe } from '../../components/started/StartedMySafe/StartedMySafe';
import { StartedMySafeItem } from '../../components/started/StartedMySafe/StartedMySafeItem';
import { StartedTitle } from '../../components/started/StartedTitle';
import { Client } from '../../tools/client';
import { useStorage } from '../../tools/storage';

export const MySafe = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [addon, setMySafe] = useState();
  const storage = useStorage('started');

  const getAddon = () => {
    const isMySafe = (addon) => addon.name.includes('마이세이프');

    Client.get('/addons')
      .finally(() => setLoading(false))
      .then(({ data }) => data.addons.find(isMySafe))
      .then(setMySafe);
  };

  const onClick = (include) => () => {
    if (include) {
      const addons = storage.get('addonIds', []);
      addons.push(addon.addonId);
      storage.set('addonIds', addons);
    }

    window.scrollTo(0, 0);
    navigate('/started/mycare');
  };

  useEffect(getAddon, []);
  useEffect(() => {
    if (!addon) return;
    const addonIds = storage.get('addonIds', []);
    const addonIdx = addonIds.indexOf(addon.addonId);
    if (addonIdx <= -1) return;
    addonIds.splice(addonIdx, 1);
    storage.set('addonIds', addonIds);
  }, [addon, storage]);

  return (
    <DepthPage>
      <StartedTitle subtitle='선택상품'>마이세이프</StartedTitle>
      <StartedDescription>
        <Logo style={{ height: '.8em' }} /> 을 위한 보험 서비스
      </StartedDescription>
      <StartedHashtags>#무엇보다 #안전은 #마이킥</StartedHashtags>
      <StartedMySafe>
        <StartedMySafeItem title='🙋‍♂️ 대인 배상' description='4천만원' />
        <StartedMySafeItem title='🚘 대물 배상' description='1천만원' />
        <StartedMySafeItem title='⛑ 치료비' description='1백만원' />
        <StartedMySafeItem
          title='💰 자기부담금'
          description={
            <>
              <p>사고당 / 1백만원</p>
              <p>치료비 / 20만원</p>
            </>
          }
        />
      </StartedMySafe>
      <StartedBottom>
        <StartedIndicator current={1} />
        <StartedBottomPrimary
          disabled={loading || !addon}
          onClick={onClick(true)}
          description={
            loading
              ? '가격 확인하는 중...'
              : addon
              ? `월 ${addon.price.toLocaleString()}원`
              : '마이세이프는 판매가 임시 중단되었습니다.'
          }
        >
          마이세이프 포함하기
        </StartedBottomPrimary>
        <StartedBottomSecondary onClick={onClick(false)}>
          건너뛰기
        </StartedBottomSecondary>
      </StartedBottom>
    </DepthPage>
  );
};
