import { MotionProps, m } from 'framer-motion';

import { varContainer } from './variants';

interface Props extends MotionProps {
  className?: string;
}
/**
 * [whileInView: 元素可以在进出视口时设置动画](https://www.framer.com/motion/scroll-animations/#scroll-triggered-animations)
 *
 * + viewport: [视口](https://www.framer.com/motion/scroll-animations/###viewport)
 *
 *    + once: 仅触发一次
 */
export default function MotionViewport({ children, className, ...other }: Props) {
  return (
    <m.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={varContainer()}
      className={className}
      {...other}
    >
      {children}
    </m.div>
  );
}
