import { App, Button, Col, Row, Switch, Typography } from 'antd';

import Card from '@/components/card';
import { useThemeToken } from '@/theme/hooks';

export default function NotificationsTab() {
  const { notification } = App.useApp();
  const { colorBgContainerDisabled, colorTextSecondary } = useThemeToken();
  const handleClick = () => {
    notification.success({
      message: 'Update success!',
      duration: 3,
    });
  };
  return (
    <Card className="!h-auto flex-col">
      <Row gutter={[16, 16]}>
        <Col span={24} lg={8}>
          <Typography.Title level={4}>Activity</Typography.Title>
          <Typography.Text color={colorTextSecondary} className="opacity-70">
            Donec mi odio, faucibus at, scelerisque quis
          </Typography.Text>
        </Col>
        <Col span={24} lg={16}>
          <div
            className="flex w-full flex-col gap-4 rounded-lg px-6 py-8"
            style={{ backgroundColor: colorBgContainerDisabled }}
          >
            <div className="flex w-full justify-between">
              <div>Email me when someone answers on my form</div>
              <Switch defaultChecked />
            </div>
            <div className="flex w-full justify-between">
              <div>Email me when someone comments onmy article</div>
              <Switch />
            </div>
            <div className="flex w-full justify-between">
              <div>Email me hen someone follows me</div>
              <Switch defaultChecked />
            </div>
          </div>
        </Col>

        <Col span={24} lg={8}>
          <Typography.Title level={4}>Applications</Typography.Title>
          <Typography.Text color={colorTextSecondary} className="opacity-70">
            Donec mi odio, faucibus at, scelerisque quis
          </Typography.Text>
        </Col>
        <Col span={24} lg={16}>
          <div
            className="flex w-full flex-col gap-4 rounded-lg px-6 py-8"
            style={{ backgroundColor: colorBgContainerDisabled }}
          >
            <div className="flex w-full justify-between">
              <div>News and announcements</div>
              <Switch />
            </div>
            <div className="flex w-full justify-between">
              <div>Weekly product updates</div>
              <Switch defaultChecked />
            </div>
            <div className="flex w-full justify-between">
              <div>Weekly blog digest</div>
              <Switch />
            </div>
          </div>
        </Col>

        <div className="flex w-full justify-end">
          <Button type="primary" onClick={handleClick}>
            Save Changes
          </Button>
        </div>
      </Row>
    </Card>
  );
}
