import { useCallback, useMemo } from 'react';

import { useUserButtonPermission } from '@/store/userStore';
/**
 *
 * @returns [authKeys:string[],hasAuth:function]
 */
export function useAuth() {
  const authConfig = useUserButtonPermission();
  // 权限标识列表
  const authKeys = useMemo(() => {
    if (authConfig) {
      return authConfig;
    }
    return [];
  }, [authConfig]);
  // 校验是否具备权限
  const hasAuth = useCallback((auth: string) => authKeys.includes(auth), [authKeys]);
  // 返回权限列表和是否具有权限
  const ret: [typeof authKeys, typeof hasAuth] = [authKeys, hasAuth];
  return ret;
}
