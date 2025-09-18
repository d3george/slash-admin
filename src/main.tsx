import "./global.css";
import "./theme/theme.css";
import "./locales/i18n";
import ReactDOM from "react-dom/client";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router";
import App from "./App";
import { worker } from "./_mock";
import menuService from "./api/services/menuService";
import { registerLocalIcons } from "./components/icon";
import { GLOBAL_CONFIG } from "./global-config";
import ErrorBoundary from "./routes/components/error-boundary";
import { routesSection } from "./routes/sections";
import { urlJoin } from "./utils";

await registerLocalIcons();
await worker.start({
	onUnhandledRequest: "bypass", //这是一个非常重要的配置。它告诉 MSW，如果一个请求没有匹配到任何 handler，就放行 (bypass)，让它正常访问网络。如果没有这个配置，未被处理的请求会报错。
	serviceWorker: { url: urlJoin(GLOBAL_CONFIG.publicPath, "mockServiceWorker.js") }, //这里明确指定了 Service Worker 脚本文件的位置。这个 mockServiceWorker.js 文件通常位于 public 目录下，它是由 MSW 的命令行工具 msw init 生成的。
});
console.debug(GLOBAL_CONFIG);
if (GLOBAL_CONFIG.routerMode === "backend") {
	await menuService.getMenuList();
}

const router = createBrowserRouter(
	[
		{
			Component: () => (
				<App>
					<Outlet />
				</App>
			),
			errorElement: <ErrorBoundary />,
			children: routesSection,
		},
	],
	{
		basename: GLOBAL_CONFIG.publicPath,
	},
);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<RouterProvider router={router} />);
