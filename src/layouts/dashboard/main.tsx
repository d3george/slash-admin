import { Content } from 'antd/es/layout/layout';
import { forwardRef } from 'react';
import { Outlet } from 'react-router-dom';

import { useSettings } from '@/store/settingStore';

import { ThemeLayout } from '#/enum';

const Main = forwardRef<HTMLDivElement, {}>((_, ref) => {
  const { themeStretch, themeLayout } = useSettings();
  return (
    <Content
      ref={ref}
      className={`overflow-auto p-2 ${themeLayout === ThemeLayout.Horizontal ? '' : 'pt-20'}`}
    >
      {/* <!-- ===== Content Start ===== --> */}
      <div className={`mx-auto h-full w-full sm:px-2 ${themeStretch ? '' : 'xl:max-w-screen-xl'}`}>
        <Outlet />
      </div>
      {/* <!-- ===== Content End ===== --> */}
    </Content>
  );
});

export default Main;
