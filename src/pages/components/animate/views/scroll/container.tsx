import { Card, Typography } from 'antd';
import { useMemo } from 'react';

import MotionViewport from '@/components/animate/motion-viewport';
import { getVariant } from '@/components/animate/variants';

type Props = {
  variant: string;
};
export default function ContainerView({ variant }: Props) {
  const varients = useMemo(() => getVariant(variant), [variant]);

  return (
    <div key={variant} className="h-[480px] overflow-scroll rounded-lg bg-gray-300 px-20">
      {[...Array(40)].map((_, index) => (
        <MotionViewport key={index} variants={varients} className="mt-4">
          <Card>
            <Typography>Item {index + 1}</Typography>
          </Card>
        </MotionViewport>
      ))}
    </div>
  );
}
