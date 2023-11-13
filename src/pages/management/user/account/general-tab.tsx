import { faker } from '@faker-js/faker';
import { App, Button, Col, Form, Input, Row, Space, Switch } from 'antd';

import Card from '@/components/card';
import { UploadAvatar } from '@/components/upload';
import { useUserInfo } from '@/store/userStore';

type FieldType = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  code?: string;
  about: string;
};
export default function GeneralTab() {
  const { notification } = App.useApp();
  const { avatar, username, email } = useUserInfo();
  const initFormValues = {
    name: username,
    email,
    phone: faker.phone.number(),
    address: faker.location.county(),
    city: faker.location.city(),
    code: faker.location.zipCode(),
    about: faker.lorem.paragraphs(),
  };
  const handleClick = () => {
    notification.success({
      message: 'Update success!',
      duration: 3,
    });
  };
  return (
    <Row gutter={[16, 16]}>
      <Col span={24} lg={8}>
        <Card className="flex-col !px-6 !pb-10 !pt-20">
          <UploadAvatar defaultAvatar={avatar} />

          <Space className="py-6">
            <div>Public Profile</div>
            <Switch size="small" />
          </Space>

          <Button type="primary" danger>
            Delete User
          </Button>
        </Card>
      </Col>
      <Col span={24} lg={16}>
        <Card>
          <Form
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item<FieldType> label="Username" name="name">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<FieldType> label="Email" name="email">
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item<FieldType> label="Phone" name="phone">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<FieldType> label="Address" name="address">
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item<FieldType> label="City" name="city">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<FieldType> label="Code" name="code">
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item<FieldType> label="About" name="about">
              <Input.TextArea />
            </Form.Item>

            <div className="flex w-full justify-end">
              <Button type="primary" onClick={handleClick}>
                Save Changes
              </Button>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
