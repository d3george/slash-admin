import Chart from "@/components/chart/chart";
import useChart from "@/components/chart/useChart";

const series = [44, 55, 13, 43];
export default function ChartPie() {
	const chartOptions = useChart({
		labels: ["America", "Asia", "Europe", "Africa"],
		legend: {
			horizontalAlign: "center",
		},
		stroke: {
			show: false,
		},
		dataLabels: {
			enabled: true,
			dropShadow: {
				enabled: false,
			},
		},
		tooltip: {
			fillSeriesColor: false,
		},
		plotOptions: {
			pie: {
				donut: {
					labels: {
						show: false,
					},
				},
			},
		},
	});

	return (
		<Chart type="pie" series={series} options={chartOptions} height={320} />
	);
}
