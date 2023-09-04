import { theme } from 'antd';
import { useMemo } from 'react';

export function useThemeToken() {
  const { token } = theme.useToken();
  return useMemo(() => token, [token]);
}
