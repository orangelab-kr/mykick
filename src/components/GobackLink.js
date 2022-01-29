import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  cursor: pointer;
  text-decoration: none;
`;

export const GobackLink = ({ children, to }) => {
  const navigator = useNavigate();
  return <Container onClick={() => navigator(to || -1)}>{children}</Container>;
};
