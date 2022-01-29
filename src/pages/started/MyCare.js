import { DepthPage } from '../../components/DepthPage';
import { NoStyledLink } from '../../components/NoStyledLink';
import { StartedBottom } from '../../components/started/StartedBottom/StartedBottom';
import { StartedBottomPrimary } from '../../components/started/StartedBottom/StartedBottomPrimary';
import { StartedBottomSecondary } from '../../components/started/StartedBottom/StartedBottomSecondary';
import { StartedDescription } from '../../components/started/StartedDescription';
import { StartedHashtags } from '../../components/started/StartedHashtags';
import { StartedIndicator } from '../../components/started/StartedIndicator';
import { StartedTitle } from '../../components/started/StartedTitle';

export const MyCare = () => {
  return (
    <DepthPage>
      <StartedTitle subtitle='추가상품'>마이케어</StartedTitle>
      <StartedDescription>소모품을 제한없이 수리 받으세요!</StartedDescription>
      <StartedHashtags>#걱정없이 #이용하는 #마이킥</StartedHashtags>
      <p>
        레어 휠 커버, 프론트 휠 커퍼, 브레이크 라인 등 소모성 부품에 대해
        무제한으로 수리받을 수 있습니다.
      </p>
      <p> 배터리, 헬멧, 모터, 사이드 미러, IoT 등은 포함되지 않습니다.</p>
      <p>
        전국에서 운영중인 하이킥 지점(서울, 평택, 대전, 세종, 부산) 중에 지점을
        택하여 예약 후 수리 가능합니다. (픽업 및 배송 3만원 추가 별도 발생)
      </p>
      <StartedBottom>
        <StartedIndicator current={2} />
        <NoStyledLink to='/started/estimate'>
          <StartedBottomPrimary description='월 16,000원 / 선결제'>
            마이케어 포함하기
          </StartedBottomPrimary>
        </NoStyledLink>

        <NoStyledLink to='/started/estimate'>
          <StartedBottomSecondary>건너뛰기</StartedBottomSecondary>
        </NoStyledLink>
      </StartedBottom>
    </DepthPage>
  );
};
