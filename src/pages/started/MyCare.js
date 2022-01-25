import { AutoCenter, Button } from 'antd-mobile';
import { NoStyledLink } from '../../components/NoStyledLink';
import { StartedBottom } from '../../components/started/StartedBottom';
import { StartedDescription } from '../../components/started/StartedDescription';
import { StartedHashtags } from '../../components/started/StartedHashtags';
import { StartedIndicator } from '../../components/started/StartedIndicator';
import { StartedTitle } from '../../components/started/StartedTitle';

export const MyCare = () => {
  return (
    <div>
      <StartedTitle>마이케어⁺</StartedTitle>
      <StartedDescription>안전 그리고 안전, 또 안전!</StartedDescription>
      <StartedHashtags>#무엇보다 #안전은 #마이킥</StartedHashtags>
      <StartedBottom>
        <StartedIndicator current={2} />
        <NoStyledLink to='/started/mysafe'>
          <Button block color='primary'>
            <p style={{ fontSize: 16 }}>월 16,000원 / 추가</p>
          </Button>
        </NoStyledLink>

        <NoStyledLink
          to='/started/login'
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <AutoCenter style={{ marginTop: 20 }}>
            <div style={{ fontSize: 16, width: '100%' }}>건너뛰기</div>
          </AutoCenter>
        </NoStyledLink>
      </StartedBottom>
    </div>
  );
};
