import icon from '../assets/icons/toss-white.png';

export const PayWithToss = ({ children }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
    }}
  >
    <img src={icon} alt='' style={{ height: '1.5em' }} />
    <p>{children}</p>
  </div>
);
