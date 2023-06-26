import { Button, Col, Form, Input, Row, Statistic } from 'antd';
import { useState } from 'react';

import { ReturnButton } from './components/ReturnButton';
import { LoginStateEnum, useLoginStateContext } from './useLogin';

const { Countdown } = Statistic;

function MobileForm() {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const [countdown, setCountdown] = useState(0); // 倒计时的秒数
  const { loginState, backToLogin } = useLoginStateContext();

  if (loginState !== LoginStateEnum.MOBILE) return null;

  const start = () => {
    setCountdown(60);
  };

  const reset = () => {
    // TODO: 发送验证码请求

    // 启动倒计时
    setCountdown(0);
  };
  return (
    <>
      <div className="mb-4 text-2xl font-bold xl:text-3xl">手机登录</div>
      <Form name="normal_login" size="large" initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item name="phone" rules={[{ required: true, message: 'Please input your Phone!' }]}>
          <Input placeholder="手机号码" />
        </Form.Item>
        <Form.Item name="code" rules={[{ required: true, message: 'Please input your SMS code!' }]}>
          <Row justify="space-between">
            <Col span={14}>
              <Input placeholder="SMS code" />
            </Col>
            <Col span={9} flex={1}>
              <Button disabled={countdown !== 0} className="w-full !text-sm" onClick={start}>
                {countdown === 0 ? (
                  <span>获取验证码</span>
                ) : (
                  <div className="flex items-center justify-center">
                    <Countdown
                      valueStyle={{ fontSize: '0.8rem' }}
                      value={Date.now() + countdown * 1000}
                      format="ss"
                      onFinish={reset}
                    />
                    <span className="ml-1">秒后重新获取</span>
                  </div>
                )}
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full !bg-black">
            登录
          </Button>
        </Form.Item>

        <ReturnButton onClick={backToLogin} />
      </Form>
    </>
  );
}

export default MobileForm;
