import { faker } from '@faker-js/faker';
import { Card, Col, Row, Typography } from 'antd';

import Scrollbar from '@/components/scrollbar';
import { useThemeToken } from '@/theme/hooks';

const TEXT = faker.lorem.paragraphs({ min: 20, max: 30 });
export default function ScrollbarView() {
  const { colorPrimary } = useThemeToken();
  return (
    <>
      <Typography.Link
        href="https://grsmto.github.io/simplebar/"
        style={{ color: colorPrimary }}
        className="mb-4 block"
      >
        https://grsmto.github.io/simplebar/
      </Typography.Link>
      <Row gutter={[16, 16]} justify="center">
        <Col span={23} lg={12}>
          <Card title="Vertical">
            <div className="h-80">
              <Scrollbar>{TEXT}</Scrollbar>
            </div>
          </Card>
        </Col>
        <Col span={23} lg={12}>
          <Card title="Horizontal">
            <Scrollbar>
              <div style={{ width: '200%' }}>{TEXT}</div>
            </Scrollbar>
          </Card>
        </Col>
      </Row>
    </>
  );
}
