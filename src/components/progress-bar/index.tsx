import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { usePathname } from "@/router/hooks";
import { useEffect } from "react";
import "./index.css";

// 配置 NProgress
NProgress.configure({
	showSpinner: false,
	minimum: 0.1,
	trickleSpeed: 200,
});

export default function ProgressBar() {
	const pathname = usePathname();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		NProgress.start();
		const timer = setTimeout(() => NProgress.done(), 100);

		return () => {
			clearTimeout(timer);
			NProgress.done();
		};
	}, [pathname]); // 保留 pathname 依赖

	return null;
}
