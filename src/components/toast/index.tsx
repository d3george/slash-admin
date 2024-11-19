import { useSettings } from "@/store/settingStore";
import { useThemeToken } from "@/theme/hooks";

import { Toaster } from "sonner";
import Iconify from "../icon/iconify-icon";

/**
 * https://sonner.emilkowal.ski/getting-started
 */
export default function Toast() {
	const { themeMode } = useSettings();
	const {
		colorInfo,
		colorSuccess,
		colorWarning,
		colorError,
		colorBgContainer,
	} = useThemeToken();

	return (
		<Toaster
			position="top-right"
			theme={themeMode}
			toastOptions={{
				duration: 3000,
				style: {
					backgroundColor: colorBgContainer,
				},
				classNames: {
					toast: "flex  rounded-lg border-0",
					description: "text-xs text-current/45",
					icon: "flex items-center justify-center px-4 rounded-lg",
					success: "bg-success/10",
					error: "bg-error/10",
					warning: "bg-warning/10",
					info: "bg-info/10",
				},
			}}
			icons={{
				success: (
					<div className="p-2 bg-success/10 rounded-lg">
						<Iconify
							icon="carbon:checkmark-filled"
							size={24}
							color={colorSuccess}
						/>
					</div>
				),
				error: (
					<div className="p-2 bg-error/10 rounded-lg">
						<Iconify
							icon="carbon:warning-hex-filled"
							size={24}
							color={colorError}
						/>
					</div>
				),
				warning: (
					<div className="p-2 bg-warning/10 rounded-lg">
						<Iconify
							icon="carbon:warning-alt-filled"
							size={24}
							color={colorWarning}
						/>
					</div>
				),
				info: (
					<div className="p-2 bg-info/10 rounded-lg">
						<Iconify
							icon="carbon:information-filled"
							size={24}
							color={colorInfo}
						/>
					</div>
				),
			}}
			expand
		/>
	);
}
