import glass_bag from "@/assets/images/glass/ic_glass_bag.png";
import glass_buy from "@/assets/images/glass/ic_glass_buy.png";
import glass_message from "@/assets/images/glass/ic_glass_message.png";
import glass_users from "@/assets/images/glass/ic_glass_users.png";
import { Icon } from "@/components/icon";
import ChartBar from "@/pages/components/chart/view/chart-bar";
import ChartMixed from "@/pages/components/chart/view/chart-mixed";
import ChartPie from "@/pages/components/chart/view/chart-pie";
import ChartRadar from "@/pages/components/chart/view/chart-radar";
import { themeVars } from "@/theme/theme.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import AnalysisCard from "./analysis-card";
import AnalysisNews from "./analysis-news";
import AnalysisOrderTimeline from "./analysis-order-timeline";
import AnalysisTasks from "./analysis-tasks";
import AnalysisTrafficCard from "./analysis-traffic-card";

function Analysis() {
	return (
		<div className="p-2">
			<h2>Hi, Welcome back 👋</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<AnalysisCard
					cover={glass_bag}
					title="714k"
					subtitle="Weekly Sales"
					style={{
						color: themeVars.colors.palette.success.dark,
						backgroundColor: `rgba(${themeVars.colors.palette.success.defaultChannel} / .2)`,
					}}
				/>
				<AnalysisCard
					cover={glass_users}
					title="1.35m"
					subtitle="New Users"
					style={{
						color: themeVars.colors.palette.info.dark,
						backgroundColor: `rgba(${themeVars.colors.palette.info.defaultChannel} / .2)`,
					}}
				/>
				<AnalysisCard
					cover={glass_buy}
					title="1.72m"
					subtitle="New Orders"
					style={{
						color: themeVars.colors.palette.warning.dark,
						backgroundColor: `rgba(${themeVars.colors.palette.warning.defaultChannel} / .2)`,
					}}
				/>
				<AnalysisCard
					cover={glass_message}
					title="234"
					subtitle="Bug Reports"
					style={{
						color: themeVars.colors.palette.error.dark,
						backgroundColor: `rgba(${themeVars.colors.palette.error.defaultChannel} / .2)`,
					}}
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
				<Card title="Website Visits">
					<CardHeader>
						<CardTitle>Website Visits</CardTitle>
					</CardHeader>
					<CardContent>
						<ChartMixed />
					</CardContent>
				</Card>
				<Card title="Current Visits">
					<CardHeader>
						<CardTitle>Current Visits</CardTitle>
					</CardHeader>
					<CardContent>
						<ChartPie />
					</CardContent>
				</Card>
				<Card title="Conversion Rates">
					<CardHeader>
						<CardTitle>Conversion Rates</CardTitle>
					</CardHeader>
					<CardContent>
						<ChartBar />
					</CardContent>
				</Card>
				<Card title="Current Subject">
					<CardHeader>
						<CardTitle>Current Subject</CardTitle>
					</CardHeader>
					<CardContent>
						<ChartRadar />
					</CardContent>
				</Card>
				<Card title="News">
					<CardHeader>
						<CardTitle>News</CardTitle>
					</CardHeader>
					<CardContent>
						<AnalysisNews />
					</CardContent>
				</Card>
				<Card title="Order Timeline">
					<CardHeader>
						<CardTitle>Order Timeline</CardTitle>
					</CardHeader>
					<CardContent>
						<AnalysisOrderTimeline />
					</CardContent>
				</Card>

				<Card title="Traffic by Site">
					<CardHeader>
						<CardTitle>Traffic by Site</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<AnalysisTrafficCard
								icon={<Icon icon="ant-design:facebook-outlined" size={32} color="#1877f2" />}
								title="1.95k"
								subtitle="FaceBook"
							/>
							<AnalysisTrafficCard
								icon={<Icon icon="ant-design:google-outlined" size={32} color="#df3e30" />}
								title="9.12k"
								subtitle="Google"
							/>

							<AnalysisTrafficCard
								icon={<Icon icon="eva:linkedin-fill" size={32} color="#006097" />}
								title="6.98k"
								subtitle="Linkedin"
							/>

							<AnalysisTrafficCard
								icon={<Icon icon="eva:twitter-fill" size={32} color="#1c9cea" />}
								title="8.49k"
								subtitle="Twitter"
							/>
						</div>
					</CardContent>
				</Card>

				<Card title="Tasks">
					<CardHeader>
						<CardTitle>Tasks</CardTitle>
					</CardHeader>
					<CardContent>
						<AnalysisTasks />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

export default Analysis;
