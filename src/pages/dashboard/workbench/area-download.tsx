import Chart from "@/components/chart/chart";
import useChart from "@/components/chart/useChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import { useState } from "react";

export default function AreaDownload() {
	const [year, setYear] = useState("2023");
	const series: Record<string, ApexAxisChartSeries> = {
		"2022": [
			{ name: "China", data: [10, 41, 35, 51, 49, 61, 69, 91, 148, 35, 51] },
			{ name: "America", data: [10, 34, 13, 56, 77, 88, 99, 45, 13, 56, 77] },
		],

		"2023": [
			{ name: "China", data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 35, 51] },
			{ name: "America", data: [56, 13, 34, 10, 77, 99, 88, 45, 13, 56, 77] },
		],
	};
	return (
		<Card className="flex-col">
			<CardHeader>
				<CardTitle className="flex items-center justify-between">
					<span>Area Installed</span>
					<Select onValueChange={(value) => setYear(value)} defaultValue={year}>
						<SelectTrigger>
							<SelectValue defaultValue={year} />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="2023">2023</SelectItem>
							<SelectItem value="2022">2022</SelectItem>
						</SelectContent>
					</Select>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartArea series={series[year]} />
			</CardContent>
		</Card>
	);
}

function ChartArea({ series }: { series: ApexAxisChartSeries }) {
	const chartOptions = useChart({
		xaxis: {
			type: "category",
			categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jut", "Aug", "Sep", "Oct", "Nov", "Dec"],
		},
		tooltip: {},
	});

	return <Chart type="area" series={series} options={chartOptions} height={300} />;
}
