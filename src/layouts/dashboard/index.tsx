import { Layout } from 'antd';

import ProgressBar from '@/components/progress-bar';
import { useSettings } from '@/store/settingStore';
import { useThemeToken } from '@/theme/hooks';

import Header from './header';
import Main from './main';
import Nav from './nav';
import NavHorizontal from './nav-horizontal';

import { ThemeLayout } from '#/enum';

function DashboardLayout() {
  const { colorBgElevated, colorTextBase } = useThemeToken();

  const { themeLayout } = useSettings();

  return (
    <>
      <ProgressBar />

      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <Layout
        className="flex h-screen overflow-hidden"
        style={{
          color: colorTextBase,
          background: colorBgElevated,
        }}
      >
        {/* <!-- ===== Sidebar Start ===== --> */}
        {themeLayout !== ThemeLayout.Horizontal ? (
          <div className="hidden h-full lg:block">
            <Nav />
          </div>
        ) : null}
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header />
          {/* <!-- ===== Header End ===== --> */}

          {themeLayout === ThemeLayout.Horizontal ? <NavHorizontal /> : null}

          {/* <!-- ===== Main Content Start ===== --> */}
          <Main />
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </Layout>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
export default DashboardLayout;
