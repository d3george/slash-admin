import { Progress } from "@/ui/progress";
import { useEffect, useState } from "react";

export function RouteLoadingProgress() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		let lastHref = window.location.href;
		let timer: NodeJS.Timeout;

		const handleRouteChange = () => {
			setProgress(0);
			let currentProgress = 0;

			const interval = setInterval(() => {
				currentProgress += 2;
				setProgress(currentProgress);
			}, 5);

			timer = setTimeout(() => {
				clearInterval(interval);
				setProgress(100);
				setTimeout(() => setProgress(0), 100);
			}, 500);

			return () => {
				clearInterval(interval);
				clearTimeout(timer);
			};
		};

		// 监听 href 变化
		const observer = new MutationObserver(() => {
			const currentHref = window.location.href;
			if (currentHref !== lastHref) {
				lastHref = currentHref;
				handleRouteChange();
			}
		});

		// 观察整个文档的变化
		observer.observe(document, {
			subtree: true,
			childList: true,
		});

		// 监听 popstate 事件（处理浏览器前进后退）
		window.addEventListener("popstate", handleRouteChange);

		// 初始加载时触发一次
		handleRouteChange();

		// 清理监听器
		return () => {
			observer.disconnect();
			window.removeEventListener("popstate", handleRouteChange);
			clearTimeout(timer);
		};
	}, []);

	return progress > 0 ? (
		<div className="fixed top-0 left-0 right-0 z-50">
			<Progress value={progress} className="h-[3px] shadow-2xl" />
		</div>
	) : null;
}
