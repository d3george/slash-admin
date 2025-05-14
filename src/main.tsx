import "./global.css";
import "./theme/theme.css";
import "./locales/i18n";

import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet, RouterProvider, createHashRouter } from "react-router";
import App from "./App";
import worker from "./_mock";
import { registerLocalIcons } from "./components/icon";
import PageError from "./pages/sys/error/PageError";
import { routesSection } from "./routes/sections";

await registerLocalIcons();
worker.start({ onUnhandledRequest: "bypass" });

const router = createHashRouter([
	{
		Component: () => (
			<App>
				<Outlet />
			</App>
		),
		errorElement: <ErrorBoundary fallbackRender={PageError} />,
		children: routesSection,
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<RouterProvider router={router} />);
