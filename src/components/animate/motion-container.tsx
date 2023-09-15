import { m, MotionProps } from 'framer-motion';

import { varContainer } from './variants/container';

interface Props extends MotionProps {
  className?: string;
}

/**
 * Motion 通用容器
 *
 * variants: [变体可以用于使用单个动画道具为组件的整个子树设置动画](https://www.framer.com/motion/animation/#variants)
 *
 * Variants 是一组预定义的对象
 * const variants = {
 *   visible: { opacity: 1 },
 *   hidden: { opacity: 0 },
 * }
 *
 * 需要指定 inital 和 animate 属性名
 * <motion.div
 *  initial="hidden"
 *  animate="visible"
 *  variants={variants}
 * />
 */
export default function MotionContainer({ children, className }: Props) {
  return (
    <m.div
      // 这里指定 initial、animate和exit的属性名后，子组件就不需要再重复指定
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
