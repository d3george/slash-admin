import { Card, Col, Row } from 'antd';

import ContainerView from './container';

export default function Inview() {
  return (
    <Card>
      <Row justify="space-between">
        <Col xs={24} md={16} className="rounded-lg bg-gray-300 p-20">
          <ContainerView />
        </Col>
        <Col xs={24} md={7} className="h-[480] rounded-lg bg-green p-20" />
      </Row>
    </Card>
  );
}
