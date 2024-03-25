import { useMemo } from 'react';

import { useAuth } from './hook/useAuth';

type Props = {
  children?: any;
  auth: string;
};
export function AuthWrapper({ auth, children }: Props) {
  const [, hasAuth] = useAuth();
  // 计算是否有权限
  const authorized = useMemo(() => hasAuth(auth), [auth, hasAuth]);
  // 如果传入是一个函数则将结果输入函数中，主要是对childDOM进行增强
  if (typeof children === 'function') {
    return children(authorized);
  }
  // 直接传入也可以变为现隐控制，显隐控制
  return authorized ? children : null;
}
