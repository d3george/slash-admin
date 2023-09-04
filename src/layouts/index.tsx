import { Layout, theme } from 'antd';

import ProgressBar from '@/components/progress-bar';
import { useSettings } from '@/store/settingStore';

import ProContent from './content';
import ProHeader from './header';
import ProSider from './sidebar';
import TopMenu from './sidebar/TopMenu';

import { ThemeLayout } from '#/enum';

function BasicLayout() {
  const {
    token: { colorBgElevated, colorTextBase },
  } = theme.useToken();

  const { themeLayout } = useSettings();

  return (
    <>
      <ProgressBar />

      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <Layout className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        {themeLayout !== ThemeLayout.Horizontal ? (
          <div
            className="hidden h-full lg:block"
            style={{
              background: colorBgElevated,
            }}
          >
            <ProSider />
          </div>
        ) : null}
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div
          className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden"
          style={{
            color: colorTextBase,
            background: colorBgElevated,
          }}
        >
          {/* <!-- ===== Header Start ===== --> */}
          <ProHeader />
          {/* <!-- ===== Header End ===== --> */}

          {themeLayout === ThemeLayout.Horizontal ? <TopMenu /> : null}

          {/* <!-- ===== Main Content Start ===== --> */}
          <ProContent />
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </Layout>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
export default BasicLayout;
