import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  cursor: pointer;
  text-decoration: none;
`;

export const GobackLink = ({ children, to }) => {
  const navigate = useNavigate();
  return <Container onClick={() => navigate(to || -1)}>{children}</Container>;
};
