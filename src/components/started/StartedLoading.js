import { AutoCenter, SpinLoading } from 'antd-mobile';
import styled from 'styled-components';

const LoadingText = styled.div`
  text-align: center;
  margin-top: 1.8em;
  font-size: 15px;
  font-weight: 700;
`;

export const StartedLoading = ({ children }) => (
  <>
    <AutoCenter style={{ overflow: 'hidden', marginTop: '12.5em' }}>
      <SpinLoading style={{ '--size': '50px' }} />
    </AutoCenter>
    <LoadingText>{children}</LoadingText>
  </>
);
