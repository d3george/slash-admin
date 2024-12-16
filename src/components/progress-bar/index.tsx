import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { usePathname } from "@/router/hooks";
import { useThemeToken } from "@/theme/hooks";

// 配置 NProgress
NProgress.configure({
	showSpinner: false,
});

const NProgressStyle = createGlobalStyle<{ $background: string }>`
	#nprogress .bar {
		background: ${(props) => props.$background} !important;
		box-shadow: 0 0 2px ${(props) => props.$background} !important;
	}
	#nprogress .peg {
		box-shadow: 0 0 10px ${(props) => props.$background}, 0 0 5px ${(props) => props.$background} !important;
	}
`;

export default function ProgressBar() {
	const pathname = usePathname();
	const { colorPrimary } = useThemeToken();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		NProgress.start();

		// 路由变化完成时
		const timer = setTimeout(() => {
			NProgress.done();
		}, 100);

		return () => {
			clearTimeout(timer);
			NProgress.done();
		};
	}, [pathname]);

	return <NProgressStyle $background={colorPrimary} />;
}
