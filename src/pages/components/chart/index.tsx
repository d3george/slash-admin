import { themeVars } from "@/theme/theme.css";
import { Card, Col, Row, Typography } from "antd";
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
			<Typography.Link
				href="https://apexcharts.com"
				style={{ color: themeVars.colors.palette.primary.default }}
				className="mb-4 block"
			>
				https://apexcharts.com
			</Typography.Link>

			<Row gutter={[16, 16]} justify="center">
				<Col span={23} lg={12}>
					<Card title="Area">
						<ChartArea />
					</Card>
				</Col>
				<Col span={23} lg={12}>
					<Card title="Line">
						<ChartLine />
					</Card>
				</Col>

				<Col span={23} lg={12}>
					<Card title="Column Single">
						<ChartColumnSingle />
					</Card>
				</Col>
				<Col span={23} lg={12}>
					<Card title="Column Multiple">
						<ChartColumnMultiple />
					</Card>
				</Col>

				<Col span={23} lg={12}>
					<Card title="Column Stacked">
						<ChartColumnStacked />
					</Card>
				</Col>
				<Col span={23} lg={12}>
					<Card title="Column Negative">
						<ChartColumnNegative />
					</Card>
				</Col>

				<Col span={23} lg={12}>
					<Card title="Bar">
						<ChartBar />
					</Card>
				</Col>
				<Col span={23} lg={12}>
					<Card title="Column Mixed">
						<ChartMixed />
					</Card>
				</Col>

				<Col span={24} lg={12}>
					<Card title="Pie">
						<ChartPie />
					</Card>
				</Col>
				<Col span={23} lg={12}>
					<Card title="Donut">
						<ChartDonut />
					</Card>
				</Col>

				<Col span={23} lg={12}>
					<Card title="Radial Bar">
						<ChartRadial />
					</Card>
				</Col>
				<Col span={23} lg={12}>
					<Card title="Radar">
						<ChartRadar />
					</Card>
				</Col>
			</Row>
		</>
	);
}
