import { useNavigate } from 'react-router-dom';

export const GobackLink = ({ children, to }) => {
  const navigator = useNavigate();
  return <div onClick={() => navigator(to || -1)}>{children}</div>;
};
