import { AutoCenter, Button } from 'antd-mobile';
import Lottie from 'react-lottie';
import { NavLink } from 'react-router-dom';
import { StartedDescription } from '../../components/started/StartedDescription';
import { StartedHashtags } from '../../components/started/StartedHashtags';
import { StartedTitle } from '../../components/started/StartedTitle';
import * as animationData from '../../lotties/lf30_tjdy9hfq.json';

export const Auth = () => {
  return (
    <div>
      <StartedTitle>마이킥</StartedTitle>
      <StartedDescription>나만의 튼튼한 하이킥 킥보드</StartedDescription>
      <StartedHashtags>#튼튼한 #하이킥 #마이킥</StartedHashtags>
      <AutoCenter style={{ overflow: 'hidden' }}>
        <Lottie
          options={{ animationData }}
          style={{ margin: '5em 0 0 0', pointerEvents: 'none' }}
          width='30em'
        />
      </AutoCenter>

      <div
        style={{
          position: 'absolute',
          bottom: '6%',
          left: '50%',
          width: '85%',
          transform: 'translate(-50%, 0)',
        }}
      >
        <NavLink to='/auth/pricing'>
          <Button block color='primary'>
            <p style={{ fontSize: 23 }}>시작하기</p>
            <p style={{ fontSize: 16 }}>가격부터 확인할 수 있습니다.</p>
          </Button>
        </NavLink>

        <NavLink
          to='/auth/login'
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <AutoCenter style={{ marginTop: 20 }}>
            <div style={{ fontSize: 16, width: '100%' }}>
              이미 구매하셨다면 이어서 달려볼까요?
            </div>
          </AutoCenter>
        </NavLink>
      </div>
    </div>
  );
};
