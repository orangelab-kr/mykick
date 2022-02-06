import { Steps, Toast } from 'antd-mobile';
import {
  EditFill,
  ExclamationCircleFill,
  HandPayCircleOutline,
  TruckOutline,
} from 'antd-mobile-icons';
import { Navigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import { NoStyledLink } from '../../components/NoStyledLink';
import { StartedBottom } from '../../components/started/StartedBottom/StartedBottom';
import { StartedBottomPrimary } from '../../components/started/StartedBottom/StartedBottomPrimary';
import { StartedBottomSecondary } from '../../components/started/StartedBottom/StartedBottomSecondary';
import { StartedDescription } from '../../components/started/StartedDescription';
import { StartedLoading } from '../../components/started/StartedLoading';
import { StartedTitle } from '../../components/started/StartedTitle';
import { useRent } from '../../tools/useRents';

export const StatusStep = {
  Requested: 0,
  Shipping: 1,
  Shipped: 2,
  Activated: 3,
};

const StepsWithBiggerSize = styled(Steps)`
  margin-top: 4ㅅem;
  line-height: 1.2;
  --title-font-size: 1.5em;
  --description-font-size: 1em;
  --indicator-margin-right: 1em;
  --icon-size: 1.5em;
`;

const StepWithMoreHeight = styled(Steps.Step)`
  height: 13vh;
`;

export const RentStatus = () => {
  const { rentId } = useParams();
  const rent = useRent(rentId);
  if (!rentId || rent === null) {
    Toast.show({ icon: 'fail', content: '렌트를 찾을 수 없습니다.' });
    return <Navigate to='/rents' />;
  }

  if (!rent) return <StartedLoading />;
  return (
    <div>
      <StartedTitle subtitle='간편 조회'>상태</StartedTitle>
      <StartedDescription>{rent.name}</StartedDescription>
      <StepsWithBiggerSize
        direction='vertical'
        current={StatusStep[rent.status]}
      >
        <StepWithMoreHeight
          title='신청'
          description='킥보드 배정 및 배송 준비 중입니다.'
          icon={<EditFill />}
        />
        <StepWithMoreHeight
          title='배송 중...'
          description={'배송이 시작되었습니다.'}
          icon={<TruckOutline />}
        />
        <StepWithMoreHeight
          status='error'
          title='설정 필요'
          description='배송이 완료되었습니다. 아래 버튼을 눌러 마무리 설정을 진행하세요.'
          icon={<ExclamationCircleFill />}
        />
        <StepWithMoreHeight
          title='사용 중'
          description='마이킥을 이용하고 있습니다. 매월 자동으로 토스를 통해 자동 결제됩니다.'
          icon={<HandPayCircleOutline />}
        />
      </StepsWithBiggerSize>

      {rent.status === 'Requested' && (
        <StartedBottom>
          <StartedBottomPrimary
            description='배송 시작을 기다리고 있습니다.'
            disabled
          >
            대기 중...
          </StartedBottomPrimary>
          <StartedBottomSecondary>
            배송이 출발되면 알림톡으로 안내드립니다.
          </StartedBottomSecondary>
        </StartedBottom>
      )}

      {rent.status === 'Shipping' && (
        <StartedBottom>
          <StartedBottomPrimary description='배송이 출발되었습니다.' disabled>
            배송 출발됨
          </StartedBottomPrimary>
          <StartedBottomSecondary>
            배송이 완료되면 알림톡으로 안내드립니다.
          </StartedBottomSecondary>
        </StartedBottom>
      )}

      {rent.status === 'Shipped' && (
        <StartedBottom>
          <NoStyledLink to={`/rents/${rent.rentId}/activate`}>
            <StartedBottomPrimary description='이용을 하기 위한 작업이 거의 다 완료되었습니다'>
              설정하고 이용하기
            </StartedBottomPrimary>
          </NoStyledLink>
          <StartedBottomSecondary>
            고객님께 킥보드를 전달하였습니다.
          </StartedBottomSecondary>
        </StartedBottom>
      )}

      {rent.status === 'Activated' && (
        <StartedBottom>
          <NoStyledLink to={`/rents/${rent.rentId}`}>
            <StartedBottomPrimary description='이미 활성화되어 있습니다.'>
              이용하기
            </StartedBottomPrimary>
          </NoStyledLink>
          <StartedBottomSecondary>
            <Logo style={{ height: '.8em' }} />을 선택해주셔서 진심으로
            감사드립니다.
          </StartedBottomSecondary>
        </StartedBottom>
      )}
    </div>
  );
};
