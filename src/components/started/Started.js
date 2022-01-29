import { SafeArea } from 'antd-mobile';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

export const Started = () => {
  const Container = styled.div`
    margin: 20px 25px 10.5em 25px;
  `;

  return (
    <div>
      <SafeArea position='top' />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};
