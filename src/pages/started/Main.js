import { AutoCenter } from 'antd-mobile';
import Lottie from 'react-lottie';
import { NoStyledLink } from '../../components/NoStyledLink';
import { StartedBottom } from '../../components/started/StartedBottom/StartedBottom';
import { StartedBottomPrimary } from '../../components/started/StartedBottom/StartedBottomPrimary';
import { StartedBottomSecondary } from '../../components/started/StartedBottom/StartedBottomSecondary';
import { StartedDescription } from '../../components/started/StartedDescription';
import { StartedHashtags } from '../../components/started/StartedHashtags';
import { StartedTitle } from '../../components/started/StartedTitle';
import * as animationData from '../../lotties/lf30_tjdy9hfq.json';

export const Main = () => {
  return (
    <div>
      <StartedTitle>마이킥</StartedTitle>
      <StartedDescription>나만의 튼튼한 하이킥 킥보드</StartedDescription>
      <StartedHashtags>#튼튼한 #킥보드 #마이킥</StartedHashtags>
      <AutoCenter style={{ overflow: 'hidden' }}>
        <Lottie
          options={{ animationData }}
          style={{ margin: '5em 0 0 0', pointerEvents: 'none' }}
          height='50vh'
        />
      </AutoCenter>

      <StartedBottom>
        <NoStyledLink to='/started/pricing'>
          <StartedBottomPrimary description='가격부터 확인하고 결정하세요.'>
            시작하기
          </StartedBottomPrimary>
        </NoStyledLink>

        <NoStyledLink to='/auth/login'>
          <StartedBottomSecondary>
            이미 구매하셨다면 이어서 달려볼까요?
          </StartedBottomSecondary>
        </NoStyledLink>
      </StartedBottom>
    </div>
  );
};