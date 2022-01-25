import { useState } from 'react';
import { StartedDescription } from '../../components/started/StartedDescription';
import { StartedHashtags } from '../../components/started/StartedHashtags';
import { StartedLoading } from '../../components/started/StartedLoading';
import { StartedTitle } from '../../components/started/StartedTitle';

export const Estimate = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <StartedTitle>견적서</StartedTitle>
      <StartedDescription>확인하고 바로 결제하러 갈까요?</StartedDescription>
      <StartedHashtags>#착한 #가격 #마이킥</StartedHashtags>
      <StartedLoading loading={loading}>
        견적서를 확인하고 있습니다.
      </StartedLoading>
      {/* <StartedBottom>
        <StartedIndicator current={1} />
        <NoStyledLink to='/started/signup'>
          <Button block color='primary'>
            <p style={{ fontSize: 23 }}>진행하기</p>
            <p style={{ fontSize: 16 }}>월 16,000원 (첫 결제+)</p>
          </Button>
        </NoStyledLink>

        <NoStyledLink to='/started/signup'>
          <AutoCenter style={{ marginTop: 20 }}>
            <div style={{ fontSize: 16, width: '100%' }}>확인</div>
          </AutoCenter>
        </NoStyledLink>
      </StartedBottom> */}
    </div>
  );
};
