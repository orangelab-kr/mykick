import { AutoCenter, SpinLoading } from 'antd-mobile';
import styled from 'styled-components';

export const StartedLoading = ({ loading, children }) => {
  if (!loading) return <></>;
  const LoadingText = styled.div`
    text-align: center;
    margin-top: 1.8em;
    font-size: 15px;
    font-weight: 700;
  `;

  return (
    <>
      <AutoCenter style={{ overflow: 'hidden', marginTop: '12.5em' }}>
        <SpinLoading style={{ '--size': '50px' }} />
      </AutoCenter>
      <LoadingText>{children}</LoadingText>
    </>
  );
};
