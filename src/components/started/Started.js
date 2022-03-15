import { SafeArea } from 'antd-mobile';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  margin: 20px 25px 20px 25px;
  height: 130vh;
`;

export const Started = () => (
  <div>
    <SafeArea position='top' />
    <Container>
      <Outlet />
    </Container>
  </div>
);
