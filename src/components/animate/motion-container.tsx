import { type MotionProps, m } from "motion/react";
import { varContainer } from "./variants/container";

interface Props extends MotionProps {
	className?: string;
}

/**
 * MotionContainer - 动画容器组件
 *
 * 这是一个基于 Framer Motion 的通用动画容器组件，用于管理子组件的动画状态和过渡效果。
 *
 * 主要功能：
 * 1. 提供统一的动画状态管理（initial、animate、exit）
 * 2. 支持子组件的级联动画效果
 * 3. 可自定义容器样式
 *
 * 动画变体（Variants）说明：
 * - initial: 初始状态
 * - animate: 动画状态
 * - exit: 退出状态
 *
 * 子组件动画控制：
 * - 当父容器设置 variants 后，子组件可以继承这些动画属性
 * - 子组件可以通过 variants 属性指定自己的动画效果
 * - 支持多种预设动画效果：fade、slide、zoom、bounce、flip、scale、rotate 等
 *
 * 使用示例：
 * ```tsx
 * <MotionContainer>
 *   <motion.div variants={varFade().in}>
 *     <h1>Animated Content</h1>
 *   </motion.div>
 * </MotionContainer>
 * ```
 *
 * 自定义动画参数：
 * 可以通过 varContainer 函数传入以下参数来自定义动画效果：
 * - staggerIn: 子元素进入动画的延迟时间（默认：0.05s）
 * - delayIn: 整体进入动画的延迟时间（默认：0.05s）
 * - staggerOut: 子元素退出动画的延迟时间（默认：0.05s）
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
