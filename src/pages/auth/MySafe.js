import { AutoCenter, Button } from 'antd-mobile';
import { NoStyledLink } from '../../components/Link';
import { StartedDescription } from '../../components/started/StartedDescription';
import { StartedHashtags } from '../../components/started/StartedHashtags';
import { StartedIndicator } from '../../components/started/StartedIndicator';
import { StartedMySafe } from '../../components/started/StartedMySafe/StartedMySafe';
import { StartedMySafeItem } from '../../components/started/StartedMySafe/StartedMySafeItem';
import { StartedTitle } from '../../components/started/StartedTitle';

export const MySafe = () => {
  return (
    <div>
      <StartedTitle subtitle='선택상품'>마이세이프</StartedTitle>
      <StartedDescription>⛑ 마이킥을 위한 보험 서비스!</StartedDescription>
      <StartedHashtags>#무엇보다 #안전은 #마이킥</StartedHashtags>

      <StartedMySafe>
        <StartedMySafeItem title='🙋‍♂️ 대인 배상' description='4천만원' />
        <StartedMySafeItem title='🚘 대물 배상' description='1천만원' />
        <StartedMySafeItem title='⛑ 치료비' description='1백만원' />
        <StartedMySafeItem
          title='💰 자기부담금'
          description={
            <>
              <p>사고당 1백만원</p>
              <p>치료비 20만원</p>
            </>
          }
        />
      </StartedMySafe>
      <div
        style={{
          position: 'absolute',
          bottom: '6%',
          left: '50%',
          width: '85%',
          transform: 'translate(-50%, 0)',
        }}
      >
        <StartedIndicator current={1} />
        <NoStyledLink to='/auth/mysafe'>
          <Button block color='primary'>
            <p style={{ fontSize: 23 }}>마이세이프 추가하기</p>
            <p style={{ fontSize: 16 }}>월 16,000원</p>
          </Button>
        </NoStyledLink>

        <NoStyledLink
          to='/auth/login'
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <AutoCenter style={{ marginTop: 20 }}>
            <div style={{ fontSize: 16, width: '100%' }}>건너뛰기</div>
          </AutoCenter>
        </NoStyledLink>
      </div>
    </div>
  );
};
