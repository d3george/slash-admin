import { LazyMotion, domMax, m } from "motion/react";

type Props = {
	children: React.ReactNode;
};
/**
 * [Reduce bundle size by lazy-loading a subset of Motion's features](https://www.framer.com/motion/lazy-motion/)
 *
 * With LazyMotion and the m component, we can reduce this to 6kb for the initial render and then sync or async load a subset of features.
 */
export function MotionLazy({ children }: Props) {
	return (
		<LazyMotion strict features={domMax}>
			<m.div style={{ height: "100%" }}> {children} </m.div>
		</LazyMotion>
	);
}
