import { Button } from 'antd-mobile';

export const StartedBottomPrimary = ({ children, description, ...props }) => (
  <Button block color='primary' {...props}>
    <div style={{ fontSize: '1.1em', fontWeight: 600 }}>{children}</div>
    {description && <div style={{ fontSize: '.9em' }}>{description}</div>}
  </Button>
);
