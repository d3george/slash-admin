import { Navigate, Outlet } from 'react-router-dom';

import { useUserToken } from '@/store/userStore';

export default function AuthenticatedRoute() {
  const token = useUserToken();

  // 判断用户是否有权限
  if (!token?.accessToken) {
    // 如果没有授权，则跳转到登录页面
    return <Navigate to="/login" replace />;
  }

  // 如果已经授权，则直接渲染子组件
  return <Outlet />;
}
