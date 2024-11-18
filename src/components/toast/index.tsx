import { useSettings } from "@/store/settingStore";
import { useThemeToken } from "@/theme/hooks";
import { Toaster } from "sonner";

export default function Toast() {
	const { themeMode } = useSettings();
	const { colorBgContainer } = useThemeToken();

	return (
		<Toaster
			theme={themeMode}
			toastOptions={{
				style: {
					backgroundColor: colorBgContainer,
				},
			}}
			expand
		/>
	);
}
