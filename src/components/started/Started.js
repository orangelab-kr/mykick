import { SafeArea } from 'antd-mobile';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  margin: 20px 25px 10.5em 25px;
  max-height: calc(100vh - 17.6em);
  overflow: scroll;
`;

export const Started = () => (
  <div>
    <SafeArea position='top' />
    <Container>
      <Outlet />
    </Container>
  </div>
);
