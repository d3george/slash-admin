import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import worker from "./_mock";
import "./locales/i18n";
import "./global.css";
import "./theme/theme.css";
import App from "./App";
import { registerLocalIcons } from "./components/icon";
import { RouteLoadingProgress } from "./components/loading";

const charAt = `
  ╔═══════ SLASH ADMIN ═══════╗
  ║                           ║
  ║  Modern React Admin UI    ║
  ║  Built with React & Vite  ║
  ║                           ║
  ╚═══════════════════════════╝
`;
console.info(`%c${charAt}`, "color: #5BE49B; font-weight: bold;");

await registerLocalIcons();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<HelmetProvider>
		<QueryClientProvider client={new QueryClient()}>
			{/* <ReactQueryDevtools initialIsOpen={false} /> */}
			<Suspense>
				<RouteLoadingProgress />
				<Analytics />
				<App />
			</Suspense>
		</QueryClientProvider>
	</HelmetProvider>,
);

// 🥵 start service worker mock in development mode
worker.start({ onUnhandledRequest: "bypass" });
