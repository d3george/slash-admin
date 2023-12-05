import { useLayoutEffect } from 'react';

import { useRouter } from '@/router/hooks';

type Props = {
  src: string;
};
export default function ExternalLink({ src }: Props) {
  const { back } = useRouter();
  useLayoutEffect(() => {
    window.open(src, '_black');
    back();
  });
  return <div />;
}
