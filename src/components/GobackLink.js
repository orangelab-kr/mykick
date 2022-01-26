import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const GobackLink = ({ children, to }) => {
  const navigator = useNavigate();
  const Container = styled.div`
    cursor: pointer;
    text-decoration: none;
  `;

  return <Container onClick={() => navigator(to || -1)}>{children}</Container>;
};
