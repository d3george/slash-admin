import { Button, Form, Input } from 'antd';

import { ReturnButton } from './components/ReturnButton';
import { LoginStateEnum, useLoginStateContext } from './useLogin';

function RegisterForm() {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const { loginState, backToLogin } = useLoginStateContext();

  if (loginState !== LoginStateEnum.REGISTER) return null;

  return (
    <>
      <div className="mb-4 text-2xl font-bold xl:text-3xl">注册</div>
      <Form name="normal_login" size="large" initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input placeholder="账号" />
        </Form.Item>
        <Form.Item name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
          <Input placeholder="邮箱" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password type="password" placeholder="密码" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[{ required: true, message: 'Please input your Confirm Password!' }]}
        >
          <Input.Password type="password" placeholder="确认密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full !bg-black">
            注册
          </Button>
        </Form.Item>

        <div className="mb-2 text-xs text-gray">
          <span>注册即我同意</span>
          <a href="./" className="text-sm !text-black !underline">
            服务条款
          </a>
          和
          <a href="./" className="text-sm !text-black !underline">
            隐私政策
          </a>
        </div>

        <ReturnButton onClick={backToLogin} />
      </Form>
    </>
  );
}

export default RegisterForm;
