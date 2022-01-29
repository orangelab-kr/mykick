import styled from 'styled-components';

export const StartedBottom = ({ children }) => {
  const Bottom = styled.div`
    position: fixed;
    bottom: 0%;
    left: 0;
    right: 0;
    width: 100%;
    height: 10em;
    padding-top: 0.5em;
    background-color: white;
  `;

  const Container = styled.div`
    margin: 0 1.5em 0.8em 1.5em;
  `;

  return (
    <Bottom>
      <Container>{children}</Container>
    </Bottom>
  );
};
