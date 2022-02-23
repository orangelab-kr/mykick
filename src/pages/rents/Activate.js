import { Button, Form, Input, Toast } from 'antd-mobile';
import { CheckOutline } from 'antd-mobile-icons';
import { useState } from 'react';
import QrReader from 'react-qr-reader';
import { Navigate, useParams } from 'react-router-dom';
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
  const onRequest = async (payload) => {
    setLoading(true);
    Client.post(`/rents/${rent.rentId}/activate`, payload)
      .then(() => setActivate(true))
      .finally(() => setLoading(false));
  };

  const onScan = async (url) => {
    if (loading || !url) return;
    if (window.navigator.vibrate) window.navigator.vibrate(100);
    await onRequest({ url });
  };

  if (!rent) return <StartedLoading />;
  if (rent.status !== 'Shipped') {
    return <Navigate to={`/rents/${rent.rentId}`} />;
  }

  return (
    <DepthPage>
      <StartedTitle subtitle='마무리 단계'>활성화</StartedTitle>
      <StartedDescription>킥보드 QR코드를 인식시켜주세요.</StartedDescription>
      <QrReader
        style={{ marginTop: '3em' }}
        onScan={onScan}
        onError={onError}
      />

      <Form onFinish={onRequest}>
        <Form.Item
          name='kickboardCode'
          label='킥보드 코드'
          rules={[{ length: 6, message: '킥보드 코드는 6자리입니다.' }]}
          extra={
            <Button
              type='submit'
              color='primary'
              disabled={loading || activate}
            >
              <CheckOutline /> 확인
            </Button>
          }
        >
          <Input
            placeholder='킥보드 코드를 입력해주세요.'
            disabled={loading || activate}
          />
        </Form.Item>
      </Form>

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
