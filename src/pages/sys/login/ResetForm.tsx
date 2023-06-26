import { Button, Form, Input } from 'antd';

import { SvgIcon } from '@/components/icon';

import { ReturnButton } from './components/ReturnButton';
import { LoginStateEnum, useLoginStateContext } from './useLogin';

function ResetForm() {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const { loginState, backToLogin } = useLoginStateContext();

  if (loginState !== LoginStateEnum.RESET_PASSWORD) return null;

  return (
    <>
      <div className="mb-8 text-center">
        <SvgIcon icon="ic-reset-password" size="100" />
      </div>
      <div className="mb-4 text-center text-2xl font-bold xl:text-3xl">忘记密码？</div>
      <Form name="normal_login" size="large" initialValues={{ remember: true }} onFinish={onFinish}>
        <p className="mb-4 text-center text-gray">
          Please enter the email address associated with your account and We will email you a link
          to reset your password.
        </p>
        <Form.Item name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
          <Input placeholder="邮箱" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full !bg-black">
            发送邮件
          </Button>
        </Form.Item>

        <ReturnButton onClick={backToLogin} />
      </Form>
    </>
  );
}

export default ResetForm;
