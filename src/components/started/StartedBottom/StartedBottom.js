import styled from 'styled-components';

const Bottom = styled.div`
  position: fixed;
  bottom: 0%;
  left: 0;
  right: 0;
  width: 100%;
  padding-top: 0.5em;
  background-color: white;
`;

const Container = styled.div`
  margin: 0 1.5em 1em 1.5em;
`;

export const StartedBottom = ({ children }) => (
  <Bottom>
    <Container>{children}</Container>
  </Bottom>
);
