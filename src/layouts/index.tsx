import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import Header from './header';
import Sider from './sider';

function BasicLayout() {
  return (
    <Layout className="!min-h-[100vh]">
      <Header />
      <Sider />
      <Outlet />
    </Layout>
  );
}
export default BasicLayout;
