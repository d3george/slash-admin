import { useRef } from "react";
import "./line-loading.css";
import { useSettings } from "@/store/settingStore";
import { commonColors, paletteColors } from "@/theme/tokens/color";

export function LineLoading() {
	const containerRef = useRef<HTMLDivElement>(null);

	const { themeMode } = useSettings();

	return (
		<div className="m-auto flex h-full w-96 items-center justify-center">
			<div
				ref={containerRef}
				className="relative h-1.5 w-full overflow-hidden rounded"
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
