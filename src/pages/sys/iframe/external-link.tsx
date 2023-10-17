import { useLayoutEffect } from 'react';

import { useRouter } from '@/router/hooks';

type Props = {
  to: string;
};
export default function ExternalLink({ to }: Props) {
  const { back } = useRouter();
  useLayoutEffect(() => {
    window.open(to, '_black');
    back();
  });
  return <div />;
}
