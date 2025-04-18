import { Button } from "@/ui/button";
import { Card, CardHeader, CardTitle } from "@/ui/card";
import ChartArea from "./view/chart-area";
import ChartBar from "./view/chart-bar";
import ChartColumnStacked from "./view/chart-column-Stacked";
import ChartColumnMultiple from "./view/chart-column-multiple";
import ChartColumnNegative from "./view/chart-column-negative";
import ChartColumnSingle from "./view/chart-column-single";
import ChartDonut from "./view/chart-donut";
import ChartLine from "./view/chart-line";
import ChartMixed from "./view/chart-mixed";
import ChartPie from "./view/chart-pie";
import ChartRadar from "./view/chart-radar";
import ChartRadial from "./view/chart-radial";

export default function ChartPage() {
	return (
		<>
			<Button variant="link" asChild>
				<a href="https://apexcharts.com" target="_blank" rel="noreferrer">
					https://apexcharts.com
				</a>
			</Button>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Card title="Area">
					<CardHeader>
						<CardTitle>Area</CardTitle>
					</CardHeader>
					<ChartArea />
				</Card>
				<Card title="Line">
					<CardHeader>
						<CardTitle>Line</CardTitle>
					</CardHeader>
					<ChartLine />
				</Card>
				<Card title="Column Single">
					<CardHeader>
						<CardTitle>Column Single</CardTitle>
					</CardHeader>
					<ChartColumnSingle />
				</Card>
				<Card title="Column Multiple">
					<CardHeader>
						<CardTitle>Column Multiple</CardTitle>
					</CardHeader>
					<ChartColumnMultiple />
				</Card>
				<Card title="Column Stacked">
					<CardHeader>
						<CardTitle>Column Stacked</CardTitle>
					</CardHeader>
					<ChartColumnStacked />
				</Card>
				<Card title="Column Negative">
					<CardHeader>
						<CardTitle>Column Negative</CardTitle>
					</CardHeader>
					<ChartColumnNegative />
				</Card>
				<Card title="Bar">
					<CardHeader>
						<CardTitle>Bar</CardTitle>
					</CardHeader>
					<ChartBar />
				</Card>
				<Card title="Column Mixed">
					<CardHeader>
						<CardTitle>Column Mixed</CardTitle>
					</CardHeader>
					<ChartMixed />
				</Card>
				<Card title="Pie">
					<CardHeader>
						<CardTitle>Pie</CardTitle>
					</CardHeader>
					<ChartPie />
				</Card>
				<Card title="Donut">
					<CardHeader>
						<CardTitle>Donut</CardTitle>
					</CardHeader>
					<ChartDonut />
				</Card>
				<Card title="Radial Bar">
					<CardHeader>
						<CardTitle>Radial Bar</CardTitle>
					</CardHeader>
					<ChartRadial />
				</Card>
				<Card title="Radar">
					<CardHeader>
						<CardTitle>Radar</CardTitle>
					</CardHeader>
					<ChartRadar />
				</Card>
			</div>
		</>
	);
}
