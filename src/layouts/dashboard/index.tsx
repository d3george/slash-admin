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
      <div
        className="flex h-screen overflow-hidden"
        style={{
          color: colorTextBase,
          background: colorBgElevated,
        }}
      >
        {/* <!-- ===== Sidebar Start ===== --> */}
        {themeLayout !== ThemeLayout.Horizontal ? (
          <div
            className="hidden h-full lg:block"
            style={{ borderRight: '1px dashed rgba(145, 158, 171, 0.2)' }}
          >
            <Nav />
          </div>
        ) : null}
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="flex  flex-1 flex-col">
          {/* <!-- ===== Header Start ===== --> */}
          <Header />
          {/* <!-- ===== Header End ===== --> */}

          {themeLayout === ThemeLayout.Horizontal ? <NavHorizontal /> : null}

          {/* <!-- ===== Main Content Start ===== --> */}
          <Main />
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
export default DashboardLayout;
