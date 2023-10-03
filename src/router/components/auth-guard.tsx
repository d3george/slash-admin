import { useUserToken } from '@/store/userStore';

import { useRouter } from '../hooks';

type Props = {
  children: React.ReactNode;
};
export default function AuthGuard({ children }: Props) {
  const router = useRouter();
  const { accessToken } = useUserToken();

  if (!accessToken) {
    router.replace('/login');
    return null;
  }

  return children;
}
