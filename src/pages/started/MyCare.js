import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DepthPage } from '../../components/DepthPage';
import { StartedBottom } from '../../components/started/StartedBottom/StartedBottom';
import { StartedBottomPrimary } from '../../components/started/StartedBottom/StartedBottomPrimary';
import { StartedBottomSecondary } from '../../components/started/StartedBottom/StartedBottomSecondary';
import { StartedDescription } from '../../components/started/StartedDescription';
import { StartedHashtags } from '../../components/started/StartedHashtags';
import { StartedIndicator } from '../../components/started/StartedIndicator';
import { StartedTitle } from '../../components/started/StartedTitle';
import { Client } from '../../tools/client';
import { useStorage } from '../../tools/storage';

export const MyCare = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [addon, setMySafe] = useState();
  const storage = useStorage('started');

  const getAddon = () => {
    const isMyCare = (addon) => addon.name.includes('마이케어');

    Client.get('/addons')
      .finally(() => setLoading(false))
      .then(({ data }) => data.addons.find(isMyCare))
      .then(setMySafe);
  };

  const onClick = (include) => () => {
    if (include) {
      const addons = storage.get('addonIds', []);
      addons.push(addon.addonId);
      storage.set('addonIds', addons);
    }

    window.scrollTo(0, 0);
    navigate('/started/estimate');
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
      <StartedTitle subtitle='추가상품'>마이케어</StartedTitle>
      <StartedDescription>소모품을 제한없이 수리 받으세요!</StartedDescription>
      <StartedHashtags>#걱정없이 #이용하는 #마이킥</StartedHashtags>
      <p>
        레어 휠 커버, 프론트 휠 커퍼, 브레이크 라인 등 소모성 부품에 대해
        무제한으로 수리받을 수 있습니다.
      </p>
      <p> 배터리, 헬멧, 모터, 사이드 미러, IoT 등은 포함되지 않습니다.</p>
      <p>
        전국에서 운영중인 하이킥 지점(서울, 평택, 대전, 세종, 부산) 중에 지점을
        택하여 예약 후 수리 가능합니다. (픽업 및 배송 3만원 추가 별도 발생)
      </p>
      <StartedBottom>
        <StartedIndicator current={2} />
        <StartedBottomPrimary
          disabled={loading || !addon}
          onClick={onClick(true)}
          description={
            loading
              ? '가격 확인하는 중...'
              : addon
              ? `월 ${addon.price.toLocaleString()}원`
              : '마이케어는 판매가 임시 중단되었습니다.'
          }
        >
          마이케어 포함하기
        </StartedBottomPrimary>

        <StartedBottomSecondary onClick={onClick(false)}>
          건너뛰기
        </StartedBottomSecondary>
      </StartedBottom>
    </DepthPage>
  );
};
