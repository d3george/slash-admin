import Chart from "@/components/chart/chart";
import useChart from "@/components/chart/useChart";

const series = [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380];

export default function ChartBar() {
	const chartOptions = useChart({
		stroke: { show: false },
		plotOptions: {
			bar: { horizontal: true, barHeight: "30%" },
		},
		xaxis: {
			categories: [
				"Italy",
				"Japan",
				"China",
				"Canada",
				"France",
				"Germany",
				"South Korea",
				"Netherlands",
				"United States",
				"United Kingdom",
			],
		},
	});

	return (
		<Chart
			type="bar"
			series={[{ data: series }]}
			options={chartOptions}
			height={320}
		/>
	);
}
