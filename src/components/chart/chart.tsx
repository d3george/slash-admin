import { memo } from "react";
import ApexChart from "react-apexcharts";
import { chartWrapper } from "./styles.css";

import type { Props as ApexChartProps } from "react-apexcharts";

function Chart(props: ApexChartProps) {
	return (
		<div className={chartWrapper}>
			<ApexChart {...props} />
		</div>
	);
}

export default memo(Chart);
