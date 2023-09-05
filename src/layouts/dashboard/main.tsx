import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';

import BreadCrumb from '../_common/bread-crumb';

export default function Main() {
  return (
    <Content className="p-4">
      <BreadCrumb />

      {/* <!-- ===== Content Start ===== --> */}
      <Outlet />
      {/* <!-- ===== Content End ===== --> */}
    </Content>
  );
}
