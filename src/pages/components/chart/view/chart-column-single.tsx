import Chart from "@/components/chart/chart";
import useChart from "@/components/chart/useChart";

const series = [
	{ name: "Net Profit", data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
];
export default function ChartColumnSingle() {
	const chartOptions = useChart({
		plotOptions: {
			bar: {
				columnWidth: "16%",
			},
		},
		stroke: {
			show: false,
		},
		xaxis: {
			categories: [
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
			],
		},
		tooltip: {
			y: {
				formatter: (value: number) => `$ ${value} thousands`,
			},
		},
	});

	return (
		<Chart type="bar" series={series} options={chartOptions} height={320} />
	);
}
