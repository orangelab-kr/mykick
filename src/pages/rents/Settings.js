import { Result } from 'antd-mobile';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { DepthPage } from '../../components/DepthPage';
import { StartedLoading } from '../../components/started/StartedLoading';
import { StartedTitle } from '../../components/started/StartedTitle';
import { useRent } from '../../tools/useRents';

const Title = styled(StartedTitle)`
  font-size: 1.5em;
`;

export const RentSettings = () => {
  const navigate = useNavigate();
  const { rentId } = useParams();
  const [rent, setRent] = useRent(rentId);

  if (!rent) return <StartedLoading />;
  return (
    <DepthPage>
      <Title>설정</Title>
      <Result
        status='waiting'
        title='아직 준비중입니다.'
        description='곧 사용하실 수 있습니다.'
      />
    </DepthPage>
  );
};
