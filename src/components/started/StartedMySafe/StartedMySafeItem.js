import { Grid } from 'antd-mobile';

export const StartedMySafeItem = ({ title, description }) => (
  <Grid.Item>
    <div style={{ margin: '0.5em 0', textAlign: 'center' }}>
      <p style={{ fontSize: '1.1em', fontWeight: 600, marginBottom: 10 }}>
        {title}
      </p>
      <p style={{ fontSize: '0.9em', fontWeight: 400, lineHeight: '1.3' }}>
        {description}
      </p>
    </div>
  </Grid.Item>
);
