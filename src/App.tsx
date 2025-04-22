import Logo from "@/assets/images/logo.png";
import Router from "@/router/index";
import { Helmet } from "react-helmet-async";
import Toast from "./components/toast";
import { AntdAdapter } from "./theme/adapter/antd.adapter";
import { ThemeProvider } from "./theme/theme-provider";

function App() {
	return (
		<ThemeProvider adapters={[AntdAdapter]}>
			<Helmet>
				<title>Slash Admin</title>
				<link rel="icon" href={Logo} />
			</Helmet>
			<Toast />

			<Router />
		</ThemeProvider>
	);
}

export default App;
