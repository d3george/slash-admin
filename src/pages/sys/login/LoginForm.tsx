import { Button, Form, Input, Alert, Checkbox, Row, Col, Divider } from 'antd';
import { AiFillGithub, AiFillGoogleCircle, AiFillWechat } from 'react-icons/ai';

import { LoginStateEnum, useLoginStateContext } from './useLogin';

function LoginForm() {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const { loginState, setLoginState } = useLoginStateContext();

  if (loginState !== LoginStateEnum.LOGIN) return null;
  return (
    <>
      <div className="mb-4 text-2xl font-bold xl:text-3xl">登录</div>
      <Form name="normal_login" size="large" initialValues={{ remember: true }} onFinish={onFinish}>
        <div className="mb-4 flex flex-col">
          <Alert
            description="Usename : demo@minimals.cc / password : demo1234"
            type="info"
            showIcon
          />
        </div>

        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12} className="text-right">
              <button
                className="!text-black !underline"
                onClick={() => setLoginState(LoginStateEnum.RESET_PASSWORD)}
              >
                忘记密码?
              </button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full !bg-black">
            登录
          </Button>
        </Form.Item>

        <Row align="middle" gutter={10}>
          <Col span={8} flex="1">
            <Button className="w-full" onClick={() => setLoginState(LoginStateEnum.MOBILE)}>
              手机登录
            </Button>
          </Col>
          <Col span={8} flex="1">
            <Button className="w-full" onClick={() => setLoginState(LoginStateEnum.QR_CODE)}>
              二维码登录
            </Button>
          </Col>
          <Col span={8} flex="1" onClick={() => setLoginState(LoginStateEnum.REGISTER)}>
            <Button className="w-full">注册</Button>
          </Col>
        </Row>

        <Divider className="!text-xs !text-[#00000073]">其它登录方式</Divider>

        <div className="flex cursor-pointer justify-around text-2xl">
          <AiFillGithub className="hover:text-[#00A76F]" />
          <AiFillWechat className="hover:text-[#00A76F]" />
          <AiFillGoogleCircle className="hover:text-[#00A76F]" />
        </div>
      </Form>
    </>
  );
}

export default LoginForm;
