import { Chart } from "@/components/chart/chart";
import { useChart } from "@/components/chart/useChart";
import Icon from "@/components/icon/icon";
import { Button } from "@/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Progress } from "@/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import { Text, Title } from "@/ui/typography";
import { cn } from "@/utils";
import { useState } from "react";

// ---------------------- 数据区 ----------------------
const timeOptions = [
	{ label: "Day", value: "day" },
	{ label: "Week", value: "week" },
	{ label: "Month", value: "month" },
];

// 所有数据都按 day/week/month 维度组织
const dashboardData = {
	webAnalytic: {
		day: {
			pageViews: 32124,
			pageViewsChange: 4.2,
			avgTime: "3m 16s",
			avgTimeChange: -0.2,
			chart: {
				series: [
					{ name: "Natural", data: [40000, 60000, 90000, 100000, 80000, 70000, 60000, 50000, 70000, 90000, 80000, 90000] },
					{ name: "Referral", data: [30000, 40000, 50000, 60000, 50000, 40000, 30000, 40000, 50000, 60000, 50000, 40000] },
					{ name: "Direct", data: [50000, 60000, 40000, 30000, 40000, 50000, 60000, 70000, 80000, 70000, 60000, 50000] },
				],
				categories: ["01 Jun", "02 Jun", "03 Jun", "04 Jun", "05 Jun", "06 Jun", "07 Jun", "08 Jun", "09 Jun", "10 Jun", "11 Jun", "12 Jun"],
			},
		},
		week: {
			pageViews: 210324,
			pageViewsChange: 2.1,
			avgTime: "3m 10s",
			avgTimeChange: -0.5,
			chart: {
				series: [
					{ name: "Natural", data: [400000, 600000, 900000, 1000000, 800000, 700000, 600000, 500000, 700000, 900000, 800000, 900000] },
					{ name: "Referral", data: [300000, 400000, 500000, 600000, 500000, 400000, 300000, 400000, 500000, 600000, 500000, 400000] },
					{ name: "Direct", data: [500000, 600000, 400000, 300000, 400000, 500000, 600000, 700000, 800000, 700000, 600000, 500000] },
				],
				categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8", "Week 9", "Week 10", "Week 11", "Week 12"],
			},
		},
		month: {
			pageViews: 420354,
			pageViewsChange: 4.8,
			avgTime: "3m 18s",
			avgTimeChange: -0.3,
			chart: {
				series: [
					{ name: "Natural", data: [50000, 60000, 65000, 67000, 62000, 64000, 66000, 68000, 69000, 70000, 71000, 72000] },
					{ name: "Referral", data: [40000, 42000, 43000, 44000, 45000, 46000, 47000, 48000, 49000, 50000, 51000, 52000] },
					{ name: "Direct", data: [45000, 47000, 48000, 49000, 50000, 51000, 52000, 53000, 54000, 55000, 56000, 57000] },
				],
				categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			},
		},
	},
	visitor: {
		day: { value: 149328, change: 5.2, tip: "vs last day" },
		week: { value: 749853, change: 8.4, tip: "vs last week" },
		month: { value: 1749853, change: 12.4, tip: "vs last year" },
	},
	conversionRate: {
		day: { value: 6.8, change: -1.8, tip: "vs last day" },
		week: { value: 7.0, change: 0.2, tip: "vs last week" },
		month: { value: 7.2, change: 0.8, tip: "vs last year" },
	},
	adCampaign: {
		day: { value: 17333, change: 2.3, tip: "vs last day" },
		week: { value: 114987, change: 6.1, tip: "vs last week" },
		month: { value: 214987, change: 15.6, tip: "vs last year" },
	},
	topPages: {
		day: [
			{ url: "/dashboard", views: 6485, viewsChange: 1.7, unique: 1078, uniqueChange: 1.2 },
			{ url: "/affiliate", views: 3687, viewsChange: 1.4, unique: 801, uniqueChange: 0.9 },
			{ url: "/contract", views: 2918, viewsChange: 2.6, unique: 655, uniqueChange: 1.4 },
			{ url: "/products", views: 4882, viewsChange: -0.7, unique: 936, uniqueChange: -0.3 },
			{ url: "/sign-in", views: 1527, viewsChange: 1.1, unique: 389, uniqueChange: 0.8 },
			{ url: "/about", views: 2103, viewsChange: -0.3, unique: 450, uniqueChange: -1.5 },
		],
		week: [
			{ url: "/dashboard", views: 36485, viewsChange: 2.7, unique: 11078, uniqueChange: 2.2 },
			{ url: "/affiliate", views: 23687, viewsChange: 1.9, unique: 9801, uniqueChange: 1.5 },
			{ url: "/contract", views: 12918, viewsChange: 3.1, unique: 7655, uniqueChange: 2.1 },
			{ url: "/products", views: 14882, viewsChange: -0.2, unique: 9936, uniqueChange: 0.1 },
			{ url: "/sign-in", views: 11527, viewsChange: 1.5, unique: 4389, uniqueChange: 1.2 },
			{ url: "/about", views: 12103, viewsChange: 0.3, unique: 5450, uniqueChange: -0.5 },
		],
		month: [
			{ url: "/dashboard", views: 76485, viewsChange: 4.7, unique: 21078, uniqueChange: 3.2 },
			{ url: "/affiliate", views: 43687, viewsChange: 2.4, unique: 18001, uniqueChange: 1.9 },
			{ url: "/contract", views: 22918, viewsChange: 4.6, unique: 16555, uniqueChange: 2.4 },
			{ url: "/products", views: 24882, viewsChange: 0.7, unique: 19360, uniqueChange: 0.3 },
			{ url: "/sign-in", views: 21527, viewsChange: 2.1, unique: 8389, uniqueChange: 1.8 },
			{ url: "/about", views: 22103, viewsChange: 0.8, unique: 9450, uniqueChange: -1.2 },
		],
	},
	sessionDevices: {
		day: [
			{ label: "Desktop", value: 42.1, color: "#3b82f6", icon: "mdi:desktop-mac" },
			{ label: "Mobile", value: 33.7, color: "#f59e42", icon: "mdi:cellphone" },
			{ label: "Tablet", value: 19.6, color: "#6366f1", icon: "mdi:tablet" },
		],
		week: [
			{ label: "Desktop", value: 42.1, color: "#3b82f6", icon: "mdi:desktop-mac" },
			{ label: "Mobile", value: 33.7, color: "#f59e42", icon: "mdi:cellphone" },
			{ label: "Tablet", value: 19.6, color: "#6366f1", icon: "mdi:tablet" },
		],
		month: [
			{ label: "Desktop", value: 42.1, color: "#3b82f6", icon: "mdi:desktop-mac" },
			{ label: "Mobile", value: 33.7, color: "#f59e42", icon: "mdi:cellphone" },
			{ label: "Tablet", value: 19.6, color: "#6366f1", icon: "mdi:tablet" },
		],
	},
	topChannels: {
		day: [
			{ name: "Google", percent: 40, total: 31731, icon: "logos:google-icon" },
			{ name: "Instagram", percent: 30, total: 23798, icon: "skill-icons:instagram" },
			{ name: "Facebook", percent: 15, total: 11889, icon: "logos:facebook" },
			{ name: "X", percent: 13, total: 10318, icon: "ri:twitter-x-fill" },
		],
		week: [
			{ name: "Google", percent: 38, total: 61731, icon: "logos:google-icon" },
			{ name: "Instagram", percent: 32, total: 43798, icon: "skill-icons:instagram" },
			{ name: "Facebook", percent: 17, total: 21889, icon: "logos:facebook" },
			{ name: "X", percent: 11, total: 20318, icon: "ri:twitter-x-fill" },
		],
		month: [
			{ name: "Google", percent: 41, total: 131731, icon: "logos:google-icon" },
			{ name: "Instagram", percent: 29, total: 123798, icon: "skill-icons:instagram" },
			{ name: "Facebook", percent: 16, total: 61189, icon: "logos:facebook" },
			{ name: "X", percent: 12, total: 40318, icon: "ri:twitter-x-fill" },
		],
	},
	trafficData: {
		day: [
			{ source: "Direct", visits: 1500, unique: 1200, bounce: 40, duration: "00:03:45", progress: 60 },
			{ source: "Natural", visits: 3000, unique: 2500, bounce: 35, duration: "00:04:20", progress: 75 },
			{ source: "Referral", visits: 1000, unique: 850, bounce: 45, duration: "00:03:10", progress: 80 },
			{ source: "Social Media", visits: 2000, unique: 1800, bounce: 50, duration: "00:02:50", progress: 40 },
			{ source: "Email Campaign", visits: 800, unique: 700, bounce: 30, duration: "00:05:00", progress: 55 },
		],
		week: [
			{ source: "Direct", visits: 11500, unique: 11200, bounce: 38, duration: "00:03:35", progress: 62 },
			{ source: "Natural", visits: 23000, unique: 22500, bounce: 33, duration: "00:04:10", progress: 78 },
			{ source: "Referral", visits: 11000, unique: 9850, bounce: 43, duration: "00:03:00", progress: 82 },
			{ source: "Social Media", visits: 12000, unique: 11800, bounce: 48, duration: "00:02:40", progress: 45 },
			{ source: "Email Campaign", visits: 3800, unique: 3700, bounce: 28, duration: "00:05:10", progress: 59 },
		],
		month: [
			{ source: "Direct", visits: 31500, unique: 31200, bounce: 36, duration: "00:03:25", progress: 65 },
			{ source: "Natural", visits: 53000, unique: 52500, bounce: 31, duration: "00:04:00", progress: 80 },
			{ source: "Referral", visits: 21000, unique: 19850, bounce: 41, duration: "00:02:50", progress: 85 },
			{ source: "Social Media", visits: 22000, unique: 21800, bounce: 46, duration: "00:02:30", progress: 50 },
			{ source: "Email Campaign", visits: 7800, unique: 7700, bounce: 26, duration: "00:05:20", progress: 63 },
		],
	},
};

// ---------------------- 组件区 ----------------------
function Trend({ value }: { value: number }) {
	const trendClass = value > 0 ? "text-success" : value < 0 ? "text-error" : "text-muted-foreground";
	return (
		<span className={cn(trendClass, "flex items-center gap-1 font-bold")}>
			{value > 0 ? (
				<Icon icon="mdi:arrow-up" className="inline-block align-middle" size={16} />
			) : value < 0 ? (
				<Icon icon="mdi:arrow-down" className="inline-block align-middle" size={16} />
			) : null}
			{Math.abs(value)}%
		</span>
	);
}

export default function Analysis() {
	const [timeType, setTimeType] = useState<"day" | "week" | "month">("day");
	const webAnalytic = dashboardData.webAnalytic[timeType];
	const visitor = dashboardData.visitor[timeType];
	const conversionRate = dashboardData.conversionRate[timeType];
	const adCampaign = dashboardData.adCampaign[timeType];
	const topPages = dashboardData.topPages[timeType];
	const sessionDevices = dashboardData.sessionDevices[timeType];
	const topChannels = dashboardData.topChannels[timeType];
	const trafficData = dashboardData.trafficData[timeType];

	const chartOptions = useChart({
		xaxis: { categories: webAnalytic.chart.categories },
	});

	const deviceChartOptions = useChart({
		labels: sessionDevices.map((d) => d.label),
		stroke: {
			show: false,
		},
		legend: {
			show: false,
		},
		tooltip: {
			fillSeriesColor: false,
		},
		plotOptions: {
			pie: {
				donut: {
					size: "60%",
				},
			},
		},
	});

	return (
		<div className="flex flex-col gap-4">
			{/* summary 区块 */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-none shadow-none">
				<div>
					<Title as="h4" className="text-xl mb-1">
						Analysis overview
					</Title>
					<Text variant="body2" className="text-muted-foreground">
						Explore the metrics to understand trends and drive.
					</Text>
				</div>
				<div className="flex items-center gap-2">
					<Text variant="body2" className="text-muted-foreground">
						Show by:
					</Text>
					<Select value={timeType} onValueChange={(v) => setTimeType(v as any)}>
						<SelectTrigger className="w-32 h-9">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{timeOptions.map((opt) => (
								<SelectItem key={opt.value} value={opt.value}>
									{opt.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="flex flex-col xl:grid grid-cols-4 gap-4">
				{/* Web analytic 主图表卡片 */}
				<Card className="col-span-4 xl:col-span-3">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle>
							<Title as="h3" className="text-lg">
								Web analytic
							</Title>
						</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col gap-2">
						<div className="flex flex-wrap gap-6 items-center">
							<div>
								<Text variant="subTitle2" className="text-muted-foreground">
									Page views
								</Text>
								<div className="flex items-end gap-2">
									<Title as="h3" className="text-2xl">
										{webAnalytic.pageViews.toLocaleString()}
									</Title>
									<Trend value={webAnalytic.pageViewsChange} />
								</div>
							</div>
							<div>
								<Text variant="subTitle2" className="text-muted-foreground">
									Avg. Time on page
								</Text>
								<div className="flex items-end gap-2">
									<Title as="h3" className="text-2xl">
										{webAnalytic.avgTime}
									</Title>
									<Trend value={webAnalytic.avgTimeChange} />
								</div>
							</div>
						</div>
						<div className="w-full min-h-[200px] mt-2">
							<Chart type="line" height={320} options={chartOptions} series={webAnalytic.chart.series} />
						</div>
					</CardContent>
				</Card>

				{/* 右侧三小卡 */}
				<div className="xl:col-span-1 h-full">
					<div className="flex flex-col xl:flex-col md:flex-row gap-4 h-full">
						<Card className="flex-1">
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle>
									<Text variant="subTitle2">Visitor</Text>
								</CardTitle>
								<CardAction className="rounded-full bg-orange-200 p-2 w-10 h-10 flex items-center justify-center">
									<Icon icon="mdi:users" size={20} color="black" />
								</CardAction>
							</CardHeader>
							<CardContent>
								<Title as="h3" className="text-xl">
									{visitor.value.toLocaleString()}
								</Title>
								<div className="flex flex-row gap-2 items-center">
									<Trend value={visitor.change} />
									<Text variant="caption" className="text-muted-foreground flex items-center">
										{visitor.tip}
									</Text>
								</div>
							</CardContent>
						</Card>
						<Card className="flex-1">
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle>
									<Text variant="subTitle2">Conversion rate</Text>
								</CardTitle>
								<CardAction className="rounded-full bg-emerald-200 p-2 w-10 h-10 flex items-center justify-center">
									<Icon icon="ph:seal-percent-fill" size={20} color="black" />
								</CardAction>
							</CardHeader>
							<CardContent>
								<Title as="h3" className="text-xl">
									{conversionRate.value}%
								</Title>
								<div className="flex flex-row gap-2 items-center">
									<Trend value={conversionRate.change} />
									<Text variant="caption" className="text-muted-foreground flex items-center">
										{conversionRate.tip}
									</Text>
								</div>
							</CardContent>
						</Card>
						<Card className="flex-1">
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle>
									<Text variant="subTitle2">Ad campaign clicks</Text>
								</CardTitle>
								<CardAction className="rounded-full bg-purple-200 p-2 w-10 h-10 flex items-center justify-center">
									<Icon icon="heroicons-solid:cursor-click" size={20} color="black" />
								</CardAction>
							</CardHeader>
							<CardContent>
								<Title as="h3" className="text-xl">
									{adCampaign.value.toLocaleString()}
								</Title>
								<div className="flex flex-row gap-2 items-center">
									<Trend value={adCampaign.change} />
									<Text variant="caption" className="text-muted-foreground flex items-center">
										{adCampaign.tip}
									</Text>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-12 gap-4">
				{/* Top pages */}
				<Card className="col-span-12 md:col-span-6 xl:col-span-4">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle>
							<Title as="h3" className="text-lg">
								Top pages
							</Title>
						</CardTitle>
						<CardAction>
							<Button size="sm" variant="outline">
								<Icon icon="mdi:download" className="mr-1" />
								Export data
							</Button>
						</CardAction>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto">
							<table className="w-full text-sm">
								<thead>
									<tr>
										<th className="text-left py-1">PAGE URL</th>
										<th className="text-right py-1">VIEWS</th>
										<th className="text-right py-1">UNIQUE VISITORS</th>
									</tr>
								</thead>
								<tbody>
									{topPages.map((row) => (
										<tr key={row.url} className="border-t">
											<td className="py-2">{row.url}</td>
											<td className="py-2">
												<div className="flex items-center gap-2 justify-end">
													{row.views.toLocaleString()} <Trend value={row.viewsChange} />
												</div>
											</td>
											<td className="py-2">
												<div className="flex items-center gap-2 justify-end">
													{row.unique.toLocaleString()} <Trend value={row.uniqueChange} />
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</CardContent>
				</Card>

				{/* Session devices 饼图 */}
				<Card className="col-span-12 md:col-span-6 xl:col-span-4">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle>
							<Title as="h3" className="text-lg">
								Session devices
							</Title>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col items-center gap-2">
							<div className="w-full max-w-[180px]">
								<Chart type="donut" height={320} options={deviceChartOptions} series={sessionDevices.map((d) => d.value)} />
							</div>
							<div className="flex justify-center gap-4 mt-2">
								{sessionDevices.map((d) => (
									<div key={d.label} className="flex flex-col items-center gap-1">
										<Icon icon={d.icon} size={20} color={d.color} />
										<Text variant="body2">{d.label}</Text>
										<Text variant="body2" className="font-bold">
											{d.value}%
										</Text>
									</div>
								))}
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Top channel */}
				<Card className="col-span-12 xl:col-span-4">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle>
							<Title as="h3" className="text-lg">
								Top channel
							</Title>
						</CardTitle>
						<CardAction>
							<Button size="sm" variant="outline">
								<Icon icon="mdi:download" className="mr-1" />
								Export data
							</Button>
						</CardAction>
					</CardHeader>
					<CardContent>
						<div className="flex items-center gap-4 mb-2">
							<Title as="h3" className="text-xl">
								{topChannels.reduce((acc, c) => acc + c.total, 0).toLocaleString()}
							</Title>
							<div className="flex items-center gap-2">
								<Trend value={2.6} />
								<Text variant="caption" className="text-muted-foreground">
									vs last month
								</Text>
							</div>
						</div>
						<table className="w-full text-sm">
							<thead>
								<tr>
									<th className="text-left py-1">CHANNEL</th>
									<th className="text-right py-1">PERCENTAGE</th>
									<th className="text-right py-1">TOTAL</th>
								</tr>
							</thead>
							<tbody>
								{topChannels.map((row) => (
									<tr key={row.name} className="border-t">
										<td className="py-2 flex items-center gap-2">
											<Icon icon={row.icon} size={18} />
											{row.name}
										</td>
										<td className="py-2 text-right">{row.percent}%</td>
										<td className="py-2 text-right">{row.total.toLocaleString()}</td>
									</tr>
								))}
							</tbody>
						</table>
					</CardContent>
				</Card>

				{/* Traffic data 表格 */}
				<Card className="col-span-12">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle>
							<Title as="h3" className="text-lg">
								Traffic data
							</Title>
						</CardTitle>
						<CardAction>
							<Button size="sm" variant="outline">
								<Icon icon="mdi:download" className="mr-1" />
								Export data
							</Button>
						</CardAction>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto">
							<table className="w-full text-sm">
								<thead>
									<tr>
										<th className="text-left p-2">SOURCE</th>
										<th className="text-right p-2">VISITS</th>
										<th className="text-right p-2">UNIQUE VISITORS</th>
										<th className="text-right p-2">BOUNCE RATE</th>
										<th className="text-right p-2">AVG. SESSION DURATION</th>
										<th className="text-left p-2">PROGRESS TO GOAL (%)</th>
									</tr>
								</thead>
								<tbody>
									{trafficData.map((row) => (
										<tr key={row.source} className="border-t">
											<td className="p-2 font-mono">{row.source}</td>
											<td className="p-2 text-right">{row.visits.toLocaleString()}</td>
											<td className="p-2 text-right">{row.unique.toLocaleString()}</td>
											<td className="p-2 text-right">
												<div className="flex items-center gap-2 justify-end">
													<Trend value={row.bounce} />
												</div>
											</td>
											<td className="p-2 text-right">{row.duration}</td>
											<td className="p-2">
												<div className="flex items-center gap-2">
													<Progress value={row.progress} />
													<span className="text-xs ml-2 align-middle">{row.progress}%</span>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
