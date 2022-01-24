import { AutoCenter, PageIndicator } from 'antd-mobile';

export const StartedIndicator = ({ current }) => (
  <AutoCenter style={{ marginBottom: 10 }}>
    <PageIndicator
      total={4}
      current={current}
      style={{
        '--dot-size': '6px',
        '--active-dot-size': '20px',
        '--dot-border-radius': '50%',
        '--active-dot-border-radius': '15px',
        '--dot-spacing': '4px',
      }}
    />
  </AutoCenter>
);
