import Chart from "@/components/chart/chart";
import useChart from "@/components/chart/useChart";

const series = [
	{
		name: "Desktops",
		data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
	},
];
export default function ChartLine() {
	const chartOptions = useChart({
		xaxis: {
			categories: [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
			],
		},
		tooltip: {
			x: {
				show: false,
			},
			marker: { show: false },
		},
	});

	return (
		<Chart type="line" series={series} options={chartOptions} height={320} />
	);
}
