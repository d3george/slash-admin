import "./line-loading.css";
import { useSettings } from "@/store/settingStore";
import { commonColors, paletteColors } from "@/theme/tokens/color";

export function LineLoading() {
	const { themeMode } = useSettings();

	return (
		<div className="flex h-full min-h-screen w-full flex-col items-center justify-center">
			<div
				className="relative h-1.5 w-96 overflow-hidden rounded"
				style={{
					backgroundColor: paletteColors.gray["500"],
				}}
			>
				<div
					className="absolute left-0 top-0 h-full w-1/3 animate-loading"
					style={{
						backgroundColor: themeMode === "light" ? commonColors.black : commonColors.white,
					}}
				/>
			</div>
		</div>
	);
}
