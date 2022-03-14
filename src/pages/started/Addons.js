import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { DepthPage } from '../../components/DepthPage';
import { StartedAddonList } from '../../components/started/StartedAddon/StartedAddonList';
import { StartedBottom } from '../../components/started/StartedBottom/StartedBottom';
import { StartedBottomPrimary } from '../../components/started/StartedBottom/StartedBottomPrimary';
import { StartedDescription } from '../../components/started/StartedDescription';
import { StartedHashtags } from '../../components/started/StartedHashtags';
import { StartedIndicator } from '../../components/started/StartedIndicator';
import { StartedTitle } from '../../components/started/StartedTitle';
import { useStorage } from '../../tools/storage';
import _ from 'lodash';
import { GobackLink } from '../../components/GobackLink';
import { StartedBottomSecondary } from '../../components/started/StartedBottom/StartedBottomSecondary';

export const Addons = () => {
  const navigate = useNavigate();
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [addons, setAddons] = useState([]);
  const storage = useStorage('started');
  const price = useMemo(
    () => _.sum(_.map(selectedAddons, 'price')),
    [selectedAddons]
  );

  useEffect(() => {
    if (!addons) return;
    const addonIds = storage.get('addonIds', []);
    addons.forEach((a) => {
      const idx = addonIds.indexOf(a.addonId);
      if (idx <= -1) return;
      addonIds.splice(idx, 1);
    });

    addonIds.push(...selectedAddons.map((a) => a.addonId));
    storage.set('addonIds', addonIds);
  }, [addons, selectedAddons, storage]);

  const onClick = () => () => {
    window.scrollTo(0, 0);
    navigate('/started/estimate');
  };

  return (
    <DepthPage>
      <StartedTitle subtitle='선택상품'>부가 상품</StartedTitle>
      <StartedDescription>이런 상품은 어떠세요?</StartedDescription>
      <StartedHashtags>#더욱 #안전하게 #마이킥</StartedHashtags>
      <StartedAddonList
        addons={addons}
        setAddons={setAddons}
        selectedAddons={selectedAddons}
        setSelectedAddons={setSelectedAddons}
      />

      <StartedBottom>
        <StartedIndicator current={3} />
        <StartedBottomPrimary
          disabled={!addons}
          onClick={onClick()}
          description={
            !addons
              ? '잠시만 기다려주세요.'
              : price
              ? `첫 결제시 ${price.toLocaleString()}원`
              : '부가 상품 추가하지 않기'
          }
        >
          {price ? '추가하기' : '건너뛰기'}
        </StartedBottomPrimary>
        <GobackLink to={-1}>
          <StartedBottomSecondary>뒤로 가기</StartedBottomSecondary>
        </GobackLink>
      </StartedBottom>
    </DepthPage>
  );
};
