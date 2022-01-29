import { Button } from 'antd-mobile';

export const StartedBottomPrimary = ({ children, description, ...props }) => (
  <Button block color='primary' {...props}>
    <p style={{ fontSize: '1.1em', fontWeight: 600 }}>{children}</p>
    {description && <p style={{ fontSize: '.9em' }}>{description}</p>}
  </Button>
);
