import { AutoCenter, SpinLoading } from 'antd-mobile';
import styled from 'styled-components';

export const StartedLoading = ({ loading, children }) => {
  if (!loading) <></>;
  const LoadingText = styled.p`
    text-align: center;
    margin-top: 30px;
    font-size: 15px;
    font-weight: 700;
  `;

  return (
    <>
      <AutoCenter style={{ overflow: 'hidden', marginTop: '30vh' }}>
        <SpinLoading style={{ '--size': '50px' }} />
      </AutoCenter>
      <LoadingText>{children}</LoadingText>
    </>
  );
};
