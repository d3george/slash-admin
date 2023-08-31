import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import BreadCrumb from './BreadCrumb';

const { Content } = Layout;
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
