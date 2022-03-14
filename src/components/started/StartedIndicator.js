import { AutoCenter, PageIndicator } from 'antd-mobile';

export const StartedIndicator = ({ current }) => (
  <AutoCenter style={{ marginBottom: '.5em' }}>
    <PageIndicator
      total={6}
      current={current}
      style={{
        '--dot-size': '.4em',
        '--active-dot-size': '.7em',
        '--dot-border-radius': '50%',
        '--active-dot-border-radius': '15px',
        '--dot-spacing': '.15em',
      }}
    />
  </AutoCenter>
);
