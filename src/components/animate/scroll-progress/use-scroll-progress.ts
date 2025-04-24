import type { MotionValue } from "motion/react";
import { useScroll } from "motion/react";
import { useMemo, useRef } from "react";

/**
 * 返回类型定义，包含滚动进度值和元素引用
 */
export type UseScrollProgressReturn = {
	/** 水平滚动进度值 (0-1) */
	scrollXProgress: MotionValue<number>;
	/** 垂直滚动进度值 (0-1) */
	scrollYProgress: MotionValue<number>;
	/** 容器元素的引用，用于容器滚动模式 */
	elementRef: React.RefObject<HTMLDivElement | null>;
};

/**
 * 滚动目标类型
 * - "document": 监听整个文档的滚动
 * - "container": 监听指定容器的滚动
 */
export type UseScrollProgress = "document" | "container";

/**
 * 自定义 Hook，用于获取滚动进度
 *
 * @param target - 滚动目标类型，可选值为 "document" 或 "container"，默认为 "document"
 * @returns 返回包含滚动进度值和元素引用的对象
 *
 * @example
 * // 监听整个文档的滚动
 * const { scrollYProgress } = useScrollProgress();
 *
 * @example
 * // 监听容器的滚动
 * const { scrollYProgress, elementRef } = useScrollProgress("container");
 * // 将 elementRef 绑定到容器元素
 */
export function useScrollProgress(target: UseScrollProgress = "document"): UseScrollProgressReturn {
	const elementRef = useRef<HTMLDivElement>(null);

	const options = { container: elementRef };

	const { scrollYProgress, scrollXProgress } = useScroll(target === "container" ? options : undefined);

	const memoizedValue = useMemo(
		() => ({ elementRef, scrollXProgress, scrollYProgress }),
		[scrollXProgress, scrollYProgress],
	);

	return memoizedValue;
}
