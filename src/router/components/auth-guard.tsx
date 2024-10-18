import { lazy, useCallback, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { useUserToken } from '@/store/userStore';

import { useRouter } from '../hooks';

const PageError = lazy(() => import('@/pages/sys/error/PageError'));

type Props = {
  children: React.ReactNode;
};
export default function AuthGuard({ children }: Props) {
  const router = useRouter();
  const { accessToken } = useUserToken();

  const check = useCallback(() => {
    if (!accessToken) {
      router.replace('/login');
    }
  }, [router, accessToken]);

  useEffect(() => {
    check();
  }, [check]);

  return <ErrorBoundary FallbackComponent={PageError}>{children}</ErrorBoundary>;
}
