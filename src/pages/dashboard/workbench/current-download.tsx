import Chart from "@/components/chart/chart";
import useChart from "@/components/chart/useChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

export default function CurrentDownload() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Current Download</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartDonut />
			</CardContent>
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

	return <Chart type="donut" series={series} options={chartOptions} height={360} />;
}
