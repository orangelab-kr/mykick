import { NoStyledLink } from '../../components/NoStyledLink';
import { StartedBottom } from '../../components/started/StartedBottom/StartedBottom';
import { StartedBottomPrimary } from '../../components/started/StartedBottom/StartedBottomPrimary';
import { StartedBottomSecondary } from '../../components/started/StartedBottom/StartedBottomSecondary';
import { StartedDescription } from '../../components/started/StartedDescription';
import { StartedHashtags } from '../../components/started/StartedHashtags';
import { StartedIndicator } from '../../components/started/StartedIndicator';
import { StartedMySafe } from '../../components/started/StartedMySafe/StartedMySafe';
import { StartedMySafeItem } from '../../components/started/StartedMySafe/StartedMySafeItem';
import { StartedTitle } from '../../components/started/StartedTitle';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import { DepthPage } from '../../components/DepthPage';

export const MySafe = () => {
  return (
    <DepthPage>
      <StartedTitle subtitle='선택상품'>마이세이프</StartedTitle>
      <StartedDescription>
        <Logo style={{ height: '.8em' }} /> 을 위한 보험 서비스
      </StartedDescription>
      <StartedHashtags>#무엇보다 #안전은 #마이킥</StartedHashtags>

      <StartedMySafe>
        <StartedMySafeItem title='🙋‍♂️ 대인 배상' description='4천만원' />
        <StartedMySafeItem title='🚘 대물 배상' description='1천만원' />
        <StartedMySafeItem title='⛑ 치료비' description='1백만원' />
        <StartedMySafeItem
          title='💰 자기부담금'
          description={
            <>
              <p>사고당 / 1백만원</p>
              <p>치료비 / 20만원</p>
            </>
          }
        />
      </StartedMySafe>
      <StartedBottom>
        <StartedIndicator current={1} />
        <NoStyledLink to='/started/mycare'>
          <StartedBottomPrimary description='월 16,000원'>
            마이세이프 포함하기
          </StartedBottomPrimary>
        </NoStyledLink>

        <NoStyledLink to='/started/mycare'>
          <StartedBottomSecondary>건너뛰기</StartedBottomSecondary>
        </NoStyledLink>
      </StartedBottom>
    </DepthPage>
  );
};
