import { Toast } from 'antd-mobile';
import { useState } from 'react';
import QrReader from 'react-qr-reader';
import { useParams } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import { DepthPage } from '../../components/DepthPage';
import { NoStyledLink } from '../../components/NoStyledLink';
import { StartedBottom } from '../../components/started/StartedBottom/StartedBottom';
import { StartedBottomPrimary } from '../../components/started/StartedBottom/StartedBottomPrimary';
import { StartedBottomSecondary } from '../../components/started/StartedBottom/StartedBottomSecondary';
import { StartedDescription } from '../../components/started/StartedDescription';
import { StartedLoading } from '../../components/started/StartedLoading';
import { StartedTitle } from '../../components/started/StartedTitle';
import { Client } from '../../tools/client';
import { useRent } from '../../tools/useRents';

export const RentActivate = () => {
  const { rentId } = useParams();
  const [loading, setLoading] = useState(false);
  const [activate, setActivate] = useState(false);
  const rent = useRent(rentId);

  const onError = () => Toast.show({ content: '카메라를 실행할 수 없습니다.' });
  const onScan = async (url) => {
    if (loading || !url) return;
    setLoading(true);
    if (window.navigator.vibrate) window.navigator.vibrate(100);
    Client.post(`/rents/${rent.rentId}/activate`, { url })
      .then(() => setActivate(true))
      .finally(() => setLoading(false));
  };

  if (!rent) return <StartedLoading />;
  return (
    <DepthPage>
      <StartedTitle subtitle='마무리 단계'>활성화</StartedTitle>
      <StartedDescription>킥보드 QR코드를 인식시켜주세요.</StartedDescription>
      <QrReader
        style={{ marginTop: '3em' }}
        onScan={onScan}
        onError={onError}
      />

      <StartedBottom>
        <NoStyledLink to={`/rents/${rent.rentId}`}>
          <StartedBottomPrimary
            disabled={loading || !activate}
            description={
              activate
                ? '이제 이용을 시작해볼까요?'
                : '킥보드 QR코드를 카메라로 인식시켜주세요.'
            }
          >
            {loading ? '활성화 중...' : '이용하기'}
          </StartedBottomPrimary>
        </NoStyledLink>
        <StartedBottomSecondary>
          <Logo style={{ height: '.8em' }} />을 선택해주셔서 진심으로
          감사드립니다.
        </StartedBottomSecondary>
      </StartedBottom>
    </DepthPage>
  );
};
