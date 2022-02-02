import Lottie from 'react-lottie';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import * as animationData from '../../assets/lotties/64970-electric-scooter-baloon.json';
import { NoStyledLink } from '../../components/NoStyledLink';
import { StartedBottom } from '../../components/started/StartedBottom/StartedBottom';
import { StartedBottomPrimary } from '../../components/started/StartedBottom/StartedBottomPrimary';
import { StartedBottomSecondary } from '../../components/started/StartedBottom/StartedBottomSecondary';
import { StartedDescription } from '../../components/started/StartedDescription';
import { StartedHashtags } from '../../components/started/StartedHashtags';
import { StartedTitle } from '../../components/started/StartedTitle';

export const Landing = () => {
  return (
    <div>
      <StartedTitle>
        <Logo style={{ height: '.8em' }} />
      </StartedTitle>
      <StartedDescription>나만의 튼튼한 하이킥 킥보드</StartedDescription>
      <StartedHashtags>#튼튼한 #킥보드 #마이킥</StartedHashtags>
      <Lottie
        options={{ animationData }}
        style={{ margin: '5em 0 0 0', height: '60vh', pointerEvents: 'none' }}
      />

      <StartedBottom>
        <NoStyledLink to='/started/pricing'>
          <StartedBottomPrimary description='가격부터 확인하고 결정하세요.'>
            시작하기
          </StartedBottomPrimary>
        </NoStyledLink>

        <NoStyledLink to='/auth/login'>
          <StartedBottomSecondary>
            이미 <Logo style={{ height: '.8em' }} /> 을 갖고 계신가요?
          </StartedBottomSecondary>
        </NoStyledLink>
      </StartedBottom>
    </div>
  );
};
