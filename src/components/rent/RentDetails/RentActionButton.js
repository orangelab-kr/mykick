import { Button } from 'antd-mobile';
import { Grid } from 'antd-mobile';
import styled from 'styled-components';

export const BiggerButton = styled(Button)`
  height: ${({ $small }) => ($small ? '6em' : '10em')};
  --border-radius: 15px;
  text-align: left;
  padding-top: 1em;
  paddin-left: 1em;
`;

export const ButtonTitle = styled.div`
  height: ${({ $small }) => ($small ? '50%' : '60%')};
  font-size: 1.2em;
`;

export const ButtonIcon = styled.div`
  font-size: ${({ $small }) => ($small ? '2em' : '3em')};
  height: ${({ $small }) => ($small ? '50%' : '40%')};
  float: right;
  text-align: right;
`;

export const RentActionButton = ({ name, icon, small, ...props }) => {
  return (
    <Grid.Item>
      <BiggerButton block {...props} $small={small}>
        <ButtonTitle $small={small}>{name}</ButtonTitle>
        <ButtonIcon $small={small}>{icon}</ButtonIcon>
      </BiggerButton>
    </Grid.Item>
  );
};
