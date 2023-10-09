import { Card, Col, Row, Typography } from 'antd';

import Scrollbar from '@/components/scrollbar';
import { useThemeToken } from '@/theme/hooks';

const TEXT = `Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Quisque ut nisi.
 Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Vestibulum eu odio.
  Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Cras ultricies mi eu turpis hendrerit fringilla. 
  Phasellus consectetuer vestibulum elit. Phasellus magna. Nullam tincidunt adipiscing enim. 
  Vestibulum volutpat pretium libero. Nullam quis ante. Morbi mollis tellus ac sapien.
   Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. 
   Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
   Fusce ac felis sit amet ligula pharetra condimentum. Morbi mattis ullamcorper velit. 
   Vivamus consectetuer hendrerit lacus. Nullam quis ante. Praesent turpis. 
   Praesent porttitor, nulla vitae posuere iaculis, arcu nisl dignissim dolor, a pretium mi sem ut ipsum. 
   Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Quisque ut nisi. 
   Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Vestibulum eu odio. 
   Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Cras ultricies mi eu turpis hendrerit fringilla. 
   Phasellus consectetuer vestibulum elit. Phasellus magna. Nullam tincidunt adipiscing enim. Vestibulum volutpat pretium libero. 
   Nullam quis ante. Morbi mollis tellus ac sapien. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. 
   Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
   Fusce ac felis sit amet ligula pharetra condimentum. Morbi mattis ullamcorper velit. 
   Vivamus consectetuer hendrerit lacus. Nullam quis ante. Praesent turpis. 
   Praesent porttitor, nulla vitae posuere iaculis, arcu nisl dignissim dolor, a pretium mi sem ut ipsum.`;
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
