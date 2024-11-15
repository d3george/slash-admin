import Chart from "@/components/chart/chart";
import useChart from "@/components/chart/useChart";

const series = [
	{ name: "series1", data: [31, 40, 28, 51, 42, 109, 100] },
	{ name: "series2", data: [11, 32, 45, 32, 34, 52, 41] },
];
export default function ChartArea() {
	const chartOptions = useChart({
		xaxis: {
			type: "datetime",
			categories: [
				"2018-09-19T00:00:00.000Z",
				"2018-09-19T01:30:00.000Z",
				"2018-09-19T02:30:00.000Z",
				"2018-09-19T03:30:00.000Z",
				"2018-09-19T04:30:00.000Z",
				"2018-09-19T05:30:00.000Z",
				"2018-09-19T06:30:00.000Z",
			],
		},
		tooltip: {
			x: {
				format: "dd/MM/yy HH:mm",
			},
		},
	});

	return (
		<Chart type="area" series={series} options={chartOptions} height={320} />
	);
}
