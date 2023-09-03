import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';

import BreadCrumb from './BreadCrumb';

function ProContent() {
  return (
    <Content className="p-4">
      <BreadCrumb />

      {/* <!-- ===== Content Start ===== --> */}
      <Outlet />
      {/* <!-- ===== Content End ===== --> */}
    </Content>
  );
}

export default ProContent;
