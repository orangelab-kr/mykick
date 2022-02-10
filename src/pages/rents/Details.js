import { Dialog, Divider, Grid } from 'antd-mobile';
import {
  EyeInvisibleOutline,
  EyeOutline,
  LockOutline,
  SoundOutline,
  UnlockOutline,
} from 'antd-mobile-icons';
import { useEffect, useState } from 'react';
import { NaverMap } from 'react-naver-maps';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import { MapMyLocation } from '../../components/map/MapMyLocation';
import { RentActionButton } from '../../components/rent/RentDetails/RentActionButton';
import { RentProgress } from '../../components/rent/RentDetails/RentProgress';
import { StartedLoading } from '../../components/started/StartedLoading';
import { StartedTitle } from '../../components/started/StartedTitle';
import { Client } from '../../tools/client';
import { useRent } from '../../tools/useRents';

const RentName = styled(StartedTitle)`
  font-size: 1.3em;
`;

export const RentDetails = () => {
  const navigate = useNavigate();
  const { rentId } = useParams();
  const defaultLoc = { lat: 37.50526, lng: 127.054806 };
  const rent = useRent(rentId, { clearCache: true, realtime: true });
  const [currentLoc, setCurrentLoc] = useState(defaultLoc);
  const [positionLoc, setPositionLoc] = useState(defaultLoc);
  const [loading, setLoading] = useState({});
  const [zoom, setZoom] = useState(16);
  const [mode, setMode] = useState('static');

  const redirectIfNotActivated = () => {
    if (!rent) return;
    if (!['Requested', 'Shipping', 'Shipped'].includes(rent.status)) return;
    navigate(`/rents/${rentId}/status`);
  };

  const getCenter = () => {
    switch (mode) {
      case 'current':
        return currentLoc;
      default:
      case 'static':
        return positionLoc;
    }
  };

  const onCenterChanged = ({ _lat, _lng }) => {
    setPositionLoc({ lat: _lat, lng: _lng });
  };

  const onClick =
    (path, refresh = false, confirm = false) =>
    async () => {
      try {
        if (confirm) {
          const confirmDialog = await Dialog.confirm({
            content: '정말로 진행하시겠습니까?',
            confirmText: '네',
            cancelText: '아니요',
          });

          if (!confirmDialog) return;
        }

        if (window.navigator.vibrate) window.navigator.vibrate(100);
        setLoading((loading) => ({ ...loading, [path]: true }));
        await Client.get(`/rents/${rent.rentId}${path}`);
        // if (refresh) await refreshKickboards();
      } finally {
        setLoading((loading) => ({ ...loading, [path]: false }));
      }
    };

  useEffect(redirectIfNotActivated, [navigate, rent, rentId]);
  if (!rent) return <StartedLoading />;
  return (
    <div>
      <Logo style={{ height: '1.6em' }} />
      <RentName>{rent.name}</RentName>
      <RentProgress
        expiredAt={rent.expiredAt}
        scooterBattery={10}
        iotBattery={100}
      />
      <Divider />
      <NaverMap
        onCenterChanged={onCenterChanged}
        onZoomChanged={setZoom}
        center={getCenter()}
        mapDataControl={false}
        zoom={zoom}
        style={{
          width: '100%',
          height: '25vh',
          border: '2px solid #eee',
          borderRadius: '15px',
        }}
      >
        <MapMyLocation currentLoc={currentLoc} setCurrentLoc={setCurrentLoc} />
      </NaverMap>

      <Grid columns={2} gap={8} style={{ margin: '10px 0' }}>
        <RentActionButton
          disabled={rent.enabled}
          loading={loading['/start']}
          onClick={onClick('/start')}
          name='잠금 해제'
          icon={<UnlockOutline />}
          color='primary'
        />
        <RentActionButton
          disabled={!rent.enabled}
          loading={loading['/stop']}
          onClick={onClick('/stop')}
          name='잠금'
          icon={<LockOutline />}
        />
        <RentActionButton
          loading={loading[rent.lightOn ? '/light/on' : '/light/off']}
          onClick={onClick(rent.lightOn ? '/light/on' : '/light/off')}
          name={rent.lightOn ? '라이트 끄기' : '라이트 켜기'}
          icon={rent.lightOn ? <EyeInvisibleOutline /> : <EyeOutline />}
          color={rent.lightOn ? 'warning' : 'success'}
          small
        />
        <RentActionButton
          loading={loading['/alarm']}
          onClick={onClick('/alarm')}
          name='찾기'
          icon={<SoundOutline />}
          small
        />
      </Grid>
    </div>
  );
};
