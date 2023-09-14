import { m } from 'framer-motion';

import Cover3 from '@/assets/images/cover/cover_3.jpg';
import MotionContainer from '@/components/animate/motion-container';
import { varBounce } from '@/components/animate/variants/bounce';

type Props = {
  variant: string;
};
export default function ContainerView() {
  return (
    <MotionContainer>
      <m.img
        src={Cover3}
        style={{ objectFit: 'cover', width: '480px', height: '320px' }}
        variants={varBounce().in}
      />
    </MotionContainer>
  );
}
