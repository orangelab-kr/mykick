import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

export const Started = () => {
  const Container = styled.div`
    margin: 50px 25px 0 25px;
  `;

  return (
    <Container>
      <Outlet />
    </Container>
  );
};
