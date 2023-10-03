import { Layout, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import DashboardImg from '@/assets/images/background/dashboard.png';
import LocalePicker from '@/components/locale-picker';
import { useSettings } from '@/store/settingStore';
import { useUserToken } from '@/store/userStore';

import LoginForm from './LoginForm';
import MobileForm from './MobileForm';
import { LoginStateProvider } from './providers/LoginStateProvider';
import QrCodeFrom from './QrCodeForm';
import RegisterForm from './RegisterForm';
import ResetForm from './ResetForm';

import { ThemeMode } from '#/enum';

function Login() {
  const { t } = useTranslation();
  const token = useUserToken();
  const { themeMode } = useSettings();

  // 判断用户是否有权限
  if (token.accessToken) {
    // 如果有授权，则跳转到首页
    return <Navigate to="/dashboard" replace />;
  }

  const gradientBg =
    themeMode === ThemeMode.Light ? 'rgba(255, 255, 255, 0.88)' : 'rgba(22, 28, 36, 0.94)';
  const bg = `linear-gradient(${gradientBg}, ${gradientBg}) center center / cover no-repeat,url(/src/assets/images/background/overlay_2.jpg)`;

  return (
    <Layout className="relative flex min-h-screen flex-row">
      <div
        className="hidden grow flex-col items-center justify-center gap-[80px] bg-center  bg-no-repeat xl:flex"
        style={{
          background: bg,
        }}
      >
        <Typography.Text className="text-2xl font-bold leading-normal lg:text-3xl xl:text-4xl">
          Slash Admin
        </Typography.Text>
        <img className="max-w-[720px]" src={DashboardImg} alt="" />
        <Typography.Text className="flex flex-row gap-[16px] text-2xl">
          {t('sys.login.signInSecondTitle')}
        </Typography.Text>
      </div>

      <div className="mx-auto flex w-full !min-w-[400px] max-w-[480px] flex-col px-[16px] py-[120px] lg:px-[64px] lg:py-[240px]">
        <LoginStateProvider>
          <LoginForm />
          <MobileForm />
          <QrCodeFrom />
          <RegisterForm />
          <ResetForm />
        </LoginStateProvider>
      </div>

      <div className="absolute right-0 top-0">
        <LocalePicker />
      </div>
    </Layout>
  );
}
export default Login;
