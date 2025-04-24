import { useTheme } from "@/theme/hooks";
import { type HTMLMotionProps, type MotionValue, m, useSpring } from "motion/react";
import type { CSSProperties } from "react";

/**
 * ScrollProgress 组件属性接口
 * @interface Props
 * @extends {HTMLMotionProps<"div">} - 继承自 Framer Motion 的 div 元素属性
 * @property {string} [color] - 进度条颜色，可选
 * @property {MotionValue<number>} scrollYProgress - 滚动进度值，范围 0-1
 * @property {number} [height=4] - 进度条高度，默认为 4px
 */
interface Props extends HTMLMotionProps<"div"> {
	color?: string;
	scrollYProgress: MotionValue<number>;
	height?: number;
}

/**
 * 滚动进度条组件
 *
 * 该组件用于显示页面滚动进度，创建一个平滑的进度条动画效果。
 * 使用 Framer Motion 的 spring 动画实现平滑过渡。
 *
 * @component
 * @param {Props} props - 组件属性
 * @param {MotionValue<number>} props.scrollYProgress - 滚动进度值
 * @param {number} [props.height=4] - 进度条高度
 * @param {string} [props.color] - 进度条颜色，默认使用主题色
 *
 * @example
 * ```tsx
 * const scrollYProgress = useScroll().scrollYProgress;
 * <ScrollProgress scrollYProgress={scrollYProgress} />
 * ```
 */
export function ScrollProgress({ scrollYProgress, height = 4, color, ...other }: Props) {
	// 使用 spring 动画使进度条变化更平滑
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100, // 弹簧刚度
		damping: 30, // 阻尼系数
		restDelta: 0.001, // 停止动画的阈值
	});

	const { themeTokens } = useTheme();

	// 设置进度条颜色，优先使用传入的颜色，否则使用主题色
	const backgroundColor = color || themeTokens.color.palette.primary.default;

	// 进度条样式配置
	const style: CSSProperties = {
		transformOrigin: "0%", // 设置变换原点在左侧
		height, // 设置高度
		backgroundColor, // 设置背景色
	};

	return <m.div style={{ scaleX, ...style }} {...other} />;
}
