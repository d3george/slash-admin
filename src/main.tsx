// react-query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// vercel analytics
import { Analytics } from "@vercel/analytics/react";
// react
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
// helmet
import { HelmetProvider } from "react-helmet-async";
// svg icons
import "virtual:svg-icons-register";
// mock api
import worker from "./_mock";
// i18n
import "./locales/i18n";
// css
import "./global.css";
import "./theme/theme.css";

// root component
import App from "./App";
import ProgressBar from "./components/progress-bar";

const charAt = `
    ███████╗██╗      █████╗ ███████╗██╗  ██╗ 
    ██╔════╝██║     ██╔══██╗██╔════╝██║  ██║
    ███████╗██║     ███████║███████╗███████║
    ╚════██║██║     ██╔══██║╚════██║██╔══██║
    ███████║███████╗██║  ██║███████║██║  ██║
    ╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
  `;
console.info(`%c${charAt}`, "color: #5BE49B");

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
	<HelmetProvider>
		<QueryClientProvider client={new QueryClient()}>
			{/* <ReactQueryDevtools initialIsOpen={false} /> */}
			<Suspense>
				<ProgressBar />
				<Analytics />
				<App />
			</Suspense>
		</QueryClientProvider>
	</HelmetProvider>,
);

// 🥵 start service worker mock in development mode
worker.start({ onUnhandledRequest: "bypass" });
