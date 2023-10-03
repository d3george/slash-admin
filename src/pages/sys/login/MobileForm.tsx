import { Button, Col, Form, Input, Row, Statistic } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ReturnButton } from './components/ReturnButton';
import { LoginStateEnum, useLoginStateContext } from './providers/LoginStateProvider';

const { Countdown } = Statistic;

function MobileForm() {
  const { t } = useTranslation();
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const [countdown, setCountdown] = useState(0); // 倒计时的秒数
  const [second, setSecond] = useState(0);
  const { loginState, backToLogin } = useLoginStateContext();

  if (loginState !== LoginStateEnum.MOBILE) return null;

  const start = () => {
    setCountdown(60);
    setSecond(60);
  };

  const reset = () => {
    // TODO: 发送验证码请求

    // 启动倒计时
    setCountdown(0);
    setSecond(60);
  };
  return (
    <>
      <div className="mb-4 text-2xl font-bold xl:text-3xl">
        {t('sys.login.mobileSignInFormTitle')}
      </div>
      <Form name="normal_login" size="large" initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item name="phone" rules={[{ required: true, message: 'Please input your Phone!' }]}>
          <Input placeholder={t('sys.login.mobile')} />
        </Form.Item>
        <Form.Item
          name="code"
          rules={[{ required: true, message: t('sys.login.mobilePlaceholder') }]}
        >
          <Row justify="space-between">
            <Col span={14}>
              <Input placeholder={t('sys.login.smsCode')} />
            </Col>
            <Col span={9} flex={1}>
              <Button disabled={countdown !== 0} className="w-full !text-sm" onClick={start}>
                {countdown === 0 ? (
                  <span>{t('sys.login.sendSmsButton')}</span>
                ) : (
                  <div className="flex items-center justify-center">
                    <Countdown
                      className="hidden"
                      value={Date.now() + countdown * 1000}
                      onChange={(time) => {
                        setCountdown(Number(time) / 1000);
                        setSecond(Math.floor(Number(time) / 1000));
                      }}
                      format="ss"
                      onFinish={reset}
                    />
                    <span className="ml-1">{t('sys.login.sendSmsText', { second })}</span>
                  </div>
                )}
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            {t('sys.login.loginButton')}
          </Button>
        </Form.Item>

        <ReturnButton
          onClick={() => {
            reset();
            backToLogin();
          }}
        />
      </Form>
    </>
  );
}

export default MobileForm;
