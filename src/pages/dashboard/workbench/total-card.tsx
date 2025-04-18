import Chart from "@/components/chart/chart";
import useChart from "@/components/chart/useChart";
import { Icon } from "@/components/icon";
import { Card, CardContent } from "@/ui/card";

type Props = {
	title: string;
	increase: boolean;
	percent: string;
	count: string;
	chartData: number[];
};
export default function TotalCard({ title, increase, count, percent, chartData }: Props) {
	return (
		<Card>
			<CardContent>
				<h6 className="text-sm font-medium">{title}</h6>
				<div className="flex">
					<div className="grow">
						<div className="mb-2 mt-4 flex flex-row">
							{increase ? (
								<Icon icon="local:ic-rise" size={24} color="rgb(34, 197, 94)" />
							) : (
								<Icon icon="local:ic-decline" size={24} color="rgb(255, 86, 48)" />
							)}
							<div className="ml-2">
								<span>{increase ? "+" : "-"}</span>
								<span>{percent}</span>
							</div>
						</div>
						<h3 className="text-2xl font-bold">{count}</h3>
					</div>

					<div className="flex-1">
						<ChartLine data={chartData} />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

function ChartLine({ data }: { data: number[] }) {
	const series = [
		{
			name: "",
			data,
		},
	];
	const chartOptions = useChart({
		tooltip: {
			x: {
				show: false,
			},
		},
		xaxis: {
			labels: {
				show: false,
				showDuplicates: false,
			},
			tooltip: {
				enabled: false,
			},
			crosshairs: {
				show: false,
			},
		},
		yaxis: {
			labels: {
				show: false,
			},
			tooltip: {
				enabled: false,
			},
			crosshairs: {
				show: false,
			},
		},
		grid: {
			show: false,
		},
	});

	return <Chart type="line" series={series} options={chartOptions} width={120} />;
}
