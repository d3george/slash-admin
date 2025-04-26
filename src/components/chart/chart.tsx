import ApexChart from "react-apexcharts";
import { chartWrapper } from "./styles.css";

import type { Props as ApexChartProps } from "react-apexcharts";

export function Chart(props: ApexChartProps) {
	return (
		<div className={chartWrapper}>
			<ApexChart {...props} />
		</div>
	);
}
