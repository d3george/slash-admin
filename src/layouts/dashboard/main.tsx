import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';

import { useSettings } from '@/store/settingStore';

export default function Main() {
  const { themeStretch } = useSettings();
  return (
    <Content className="overflow-auto px-4">
      {/* <!-- ===== Content Start ===== --> */}
      <div className={`mx-auto h-full w-full sm:px-2 ${themeStretch ? '' : 'xl:max-w-screen-xl'}`}>
        <Outlet />
      </div>
      {/* <!-- ===== Content End ===== --> */}
    </Content>
  );
}
