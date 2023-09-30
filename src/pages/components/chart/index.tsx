import { Card, Col, Row } from 'antd';

import ChartArea from './view/chart-area';

export default function ChartPage() {
  return (
    <Row gutter={[8, 16]}>
      <Col span={12}>
        <Card title="Area">
          <ChartArea />
        </Card>
      </Col>
      <Col span={12} />

      <Col span={12} />
      <Col span={12} />
    </Row>
  );
}
