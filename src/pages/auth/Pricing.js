import { AutoCenter, Button } from 'antd-mobile';
import { NoStyledLink } from '../../components/Link';
import { StartedDescription } from '../../components/started/StartedDescription';
import { StartedHashtags } from '../../components/started/StartedHashtags';
import { StartedIndicator } from '../../components/started/StartedIndicator';
import { StartedTitle } from '../../components/started/StartedTitle';

export const Pricing = () => {
  return (
    <div>
      <StartedTitle>상품</StartedTitle>
      <StartedDescription>먼저, 상품을 선택해볼까요?</StartedDescription>
      <StartedHashtags>#원하는 #만큼만 #마이킥</StartedHashtags>
      <p>대충 가격표가 있을거임</p>
      <div
        style={{
          position: 'absolute',
          bottom: '6%',
          left: '50%',
          width: '85%',
          transform: 'translate(-50%, 0)',
        }}
      >
        <StartedIndicator current={0} />
        <NoStyledLink to='/auth/mysafe'>
          <Button block color='primary'>
            <p style={{ fontSize: 23 }}>이어서 진행해볼까요?</p>
            <p style={{ fontSize: 16 }}>월 38,000원</p>
          </Button>
        </NoStyledLink>

        <NoStyledLink
          to='/auth/login'
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <AutoCenter style={{ marginTop: 20 }}>
            <div style={{ fontSize: 16, width: '100%' }}>
              이미 계정이 있으신가요?
            </div>
          </AutoCenter>
        </NoStyledLink>
      </div>
    </div>
  );
};
