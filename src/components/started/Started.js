import { SafeArea } from 'antd-mobile';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  margin: 20px 25px 10.8em 25px;
  height: -webkit-fill-available;
`;

export const Started = () => (
  <div>
    <SafeArea position='top' />
    <Container>
      <Outlet />
    </Container>
  </div>
);
