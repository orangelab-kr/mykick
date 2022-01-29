import styled from 'styled-components';

const Title = styled.div`
  margin: 10px 0;
  font-size: 2em;
  font-weight: 800;
`;

const Subtitle = styled.p`
  display: inline;
  margin-left: 5px;
  font-size: 0.5em;
  font-weight: 400;
`;

export const StartedTitle = ({ children, subtitle }) => (
  <Title>
    {children}
    {subtitle && <Subtitle children={subtitle} />}
  </Title>
);
