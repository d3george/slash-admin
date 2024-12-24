import { Progress } from "antd";
import { useEffect, useState } from "react";

import { themeVars } from "@/theme/theme.css";
import { rgbAlpha } from "@/utils/theme";

export function LineLoading() {
	const [percent, setPercent] = useState(10);
	const [increasing, setIncreasing] = useState(true);

	useEffect(() => {
		const interval = setInterval(() => {
			if (increasing) {
				setPercent((prevPercent) => prevPercent + 20);
				if (percent === 100) {
					setIncreasing(false);
				}
			} else {
				setPercent(0);
				setIncreasing(true);
			}
		}, 50);

		return () => {
			clearInterval(interval);
		};
	}, [percent, increasing]);

	return (
		<div className="m-auto flex h-full w-96 items-center justify-center">
			<Progress
				percent={percent}
				trailColor={rgbAlpha(themeVars.colors.palette.primary.default, 0.8)}
				strokeColor={themeVars.colors.palette.primary.default}
				showInfo={false}
				size="small"
			/>
		</div>
	);
}
