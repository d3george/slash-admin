import { Typography } from "antd";

import Card from "@/components/card";
import Chart from "@/components/chart/chart";
import useChart from "@/components/chart/useChart";

export default function CurrentDownload() {
	return (
		<Card className="flex-col">
			<header className="self-start">
				<Typography.Title level={5}>Current Download</Typography.Title>
			</header>
			<main>
				<ChartDonut />
			</main>
		</Card>
	);
}

const series = [44, 55, 13, 43];
function ChartDonut() {
	const chartOptions = useChart({
		labels: ["Mac", "Window", "IOS", "Android"],
		stroke: {
			show: false,
		},
		legend: {
			position: "bottom",
			horizontalAlign: "center",
		},
		tooltip: {
			fillSeriesColor: false,
		},
		chart: {
			width: 240,
		},
		plotOptions: {
			pie: {
				donut: {
					size: "90%",
					labels: {
						total: {
							fontSize: "12px",
						},
						value: {
							fontSize: "18px",
							fontWeight: 700,
						},
					},
				},
			},
		},
	});

	return (
		<Chart type="donut" series={series} options={chartOptions} height={360} />
	);
}
