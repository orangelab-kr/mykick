import { SafeArea } from 'antd-mobile';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  margin: 20px 25px 5.5em 25px;
  height: 100vh;
`;

export const Started = () => (
  <div>
    <SafeArea position='top' />
    <Container>
      <Outlet />
    </Container>
  </div>
);
