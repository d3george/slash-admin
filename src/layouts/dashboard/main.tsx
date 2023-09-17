import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';

import { useSettings } from '@/store/settingStore';

import BreadCrumb from '../_common/bread-crumb';

export default function Main() {
  const { themeStretch } = useSettings();
  return (
    <Content className="px-4">
      {/* <!-- ===== Content Start ===== --> */}
      <BreadCrumb />
      <div
        className={`mx-auto h-full w-full pt-4 sm:px-2 ${themeStretch ? '' : 'xl:max-w-screen-xl'}`}
      >
        <Outlet />
      </div>
      {/* <!-- ===== Content End ===== --> */}
    </Content>
  );
}
