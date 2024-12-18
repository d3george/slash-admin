import { Helmet } from "react-helmet-async";

import Logo from "@/assets/images/logo.png";
import Router from "@/router/index";

import { MotionLazy } from "./components/animate/motion-lazy";
import Toast from "./components/toast";
import { ThemeProvider } from "./theme/theme-provider";
import { AntdAdapter } from "./theme/adapter/antd.adapter";

function App() {
	return (
		<ThemeProvider adapter={AntdAdapter}>
			<MotionLazy>
				<Helmet>
					<title>Slash Admin</title>
					<link rel="icon" href={Logo} />
				</Helmet>
				<Toast />

				<Router />
			</MotionLazy>
		</ThemeProvider>
	);
}

export default App;
