import { theme } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Progress } from '@/components/app';
import { useSettings } from '@/store/settingStore';

import Content from './content';
import Header from './header';
import Sidebar from './sidebar';
import TopMenu from './sidebar/TopMenu';

import { ThemeLayout } from '#/enum';

function BasicLayout() {
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation();
  const {
    token: { colorBgBase },
  } = theme.useToken();

  const { themeLayout } = useSettings();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 50);
    return () => setIsLoading(true);
  }, [pathname]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return (
    <div>
      <Progress isAnimating={isLoading} />

      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden" style={{ background: colorBgBase }}>
        {/* <!-- ===== Sidebar Start ===== --> */}
        {themeLayout !== ThemeLayout.Horizontal ? (
          <div className="hidden lg:block">
            <Sidebar />
          </div>
        ) : null}
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header />
          {/* <!-- ===== Header End ===== --> */}

          {themeLayout === ThemeLayout.Horizontal ? <TopMenu /> : null}

          {/* <!-- ===== Main Content Start ===== --> */}
          <Content>
            <Outlet />
          </Content>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
}
export default BasicLayout;
