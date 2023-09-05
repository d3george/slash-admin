import { m, MotionProps } from 'framer-motion';

import { varContainer } from './variants/container';

interface Props extends MotionProps {
  className?: string;
}
export default function MotionContainer({ children, className }: Props) {
  return (
    <m.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={varContainer()}
      className={className}
    >
      {children}
    </m.div>
  );
}
