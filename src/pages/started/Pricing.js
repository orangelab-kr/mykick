import { NoStyledLink } from '../../components/NoStyledLink';
import { StartedBottom } from '../../components/started/StartedBottom/StartedBottom';
import { StartedBottomPrimary } from '../../components/started/StartedBottom/StartedBottomPrimary';
import { StartedBottomSecondary } from '../../components/started/StartedBottom/StartedBottomSecondary';
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
      <StartedBottom>
        <StartedIndicator current={0} />
        <NoStyledLink to='/started/mysafe'>
          <StartedBottomPrimary description='월 38,000원'>
            이어서 진행해볼까요?
          </StartedBottomPrimary>
        </NoStyledLink>

        <NoStyledLink to='/started/login'>
          <StartedBottomSecondary>
            이미 계정이 있으신가요?
          </StartedBottomSecondary>
        </NoStyledLink>
      </StartedBottom>
    </div>
  );
};
