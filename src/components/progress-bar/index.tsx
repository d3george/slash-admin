import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import "./index.css";

// 配置 NProgress
NProgress.configure({
	showSpinner: false,
	minimum: 0.1,
	trickleSpeed: 200,
});

export default function ProgressBar() {
	useEffect(() => {
		let lastHref = window.location.href;

		const handleRouteChange = () => {
			NProgress.start();
			const timer = setTimeout(() => NProgress.done(), 100);
			return () => {
				clearTimeout(timer);
				NProgress.done();
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
		};
	}, []);

	return null;
}
