import { App as AntdApp } from "antd";
import { Helmet } from "react-helmet-async";

import Logo from "@/assets/images/logo.png";
import Router from "@/router/index";
import AntdConfig from "@/theme/antd";

import { MotionLazy } from "./components/animate/motion-lazy";
import Toast from "./components/toast";

function App() {
	return (
		<AntdConfig>
			<AntdApp>
				<MotionLazy>
					<Helmet>
						<title>Slash Admin</title>
						<link rel="icon" href={Logo} />
					</Helmet>
					<Toast />

					<Router />
				</MotionLazy>
			</AntdApp>
		</AntdConfig>
	);
}

export default App;
