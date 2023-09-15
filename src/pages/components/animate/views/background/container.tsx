import { m } from 'framer-motion';
import { useEffect, useMemo } from 'react';

import Cover3 from '@/assets/images/cover/cover_3.jpg';
import MotionContainer from '@/components/animate/motion-container';
import { getVariant } from '@/components/animate/variants';
import { useThemeToken } from '@/theme/hooks';

type Props = {
  variant: string;
};
export default function ContainerView({ variant }: Props) {
  const { colorBgLayout } = useThemeToken();
  const varients = useMemo(() => getVariant(variant), [variant]);
  const isKenburns = variant.includes('kenburns');

  useEffect(() => {
    console.log(varients);
  });
  return (
    <div
      key={variant}
      className="h-[480px] overflow-scroll rounded-lg"
      style={{ backgroundColor: colorBgLayout }}
    >
      <MotionContainer className="flex h-full w-full flex-col items-center gap-6">
        {isKenburns ? (
          <m.img src={Cover3} className="h-full w-full object-cover" variants={varients} />
        ) : (
          <m.div {...varients} className="h-full w-full" />
        )}
      </MotionContainer>
    </div>
  );
}
