import { Grid } from 'antd-mobile';

export const StartedMySafeItem = ({ title, description }) => (
  <Grid.Item>
    <div style={{ margin: '8px 0', textAlign: 'center' }}>
      <p style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>{title}</p>
      <p style={{ fontSize: 16, fontWeight: 400, lineHeight: '1.3' }}>
        {description}
      </p>
    </div>
  </Grid.Item>
);
