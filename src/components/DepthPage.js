import { LeftOutline } from 'antd-mobile-icons';
import { GobackLink } from './GobackLink';

export const DepthPage = ({ children }) => (
  <>
    <GobackLink>
      <LeftOutline />
    </GobackLink>
    <div style={{ marginTop: '1em' }}>{children}</div>
  </>
);
