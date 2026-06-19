import { Chart, useChart } from "@/components/chart";
import Icon from "@/components/icon/icon";
import { Avatar, AvatarImage } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Progress } from "@/ui/progress";
import { Badge } from "@/ui/badge";
import { Text, Title } from "@/ui/typography";
import { rgbAlpha } from "@/utils/theme";
import { useState } from "react";

const quickStats = [
	{
		icon: "solar:wallet-outline",
		label: "本月营收",
		value: "¥128,560",
		percent: 12.8,
		color: "#3b82f6",
		chart: [22, 28, 32, 36, 30, 28, 35, 40, 38, 42, 45, 48],
		description: "较上月",
	},
	{
		icon: "solar:graph-outline",
		label: "活跃用户",
		value: "8,432",
		percent: 8.3,
		color: "#10b981",
		chart: [15, 18, 20, 25, 22, 28, 30, 32, 28, 35, 38, 42],
		description: "较上周",
	},
	{
		icon: "solar:checklist-outline",
		label: "完成订单",
		value: "1,286",
		percent: 15.2,
		color: "#f59e42",
		chart: [10, 12, 15, 18, 20, 18, 22, 25, 28, 30, 32, 35],
		description: "较昨日",
	},
	{
		icon: "solar:user-outline",
		label: "新增注册",
		value: "342",
		percent: -2.4,
		color: "#ef4444",
		chart: [20, 25, 22, 18, 20, 22, 19, 17, 20, 18, 16, 15],
		description: "较昨日",
	},
];

const monthlyRevenue = {
	series: [
		{
			name: "营收",
			data: [65000, 72000, 68000, 85000, 78000, 95000, 110000, 88000, 92000, 98000, 105000, 128000],
		},
		{
			name: "支出",
			data: [45000, 48000, 42000, 55000, 52000, 62000, 70000, 58000, 60000, 65000, 68000, 75000],
		},
	],
	categories: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
	percent: 18.6,
};

const projectOverview = {
	name: "Q4 季度目标",
	progress: 72,
	milestones: [
		{ label: "产品功能迭代", completed: true, color: "#3b82f6" },
		{ label: "用户体验优化", completed: true, color: "#10b981" },
		{ label: "性能提升计划", completed: false, color: "#f59e42" },
		{ label: "安全合规审计", completed: false, color: "#6366f1" },
	],
};

const recentActivities = [
	{
		user: "张明",
		action: "完成了订单 #12846 的审核",
		time: "5 分钟前",
		type: "success",
		avatar: "mdi:account-circle",
	},
	{
		user: "李华",
		action: "新增了 3 个产品 SKU",
		time: "23 分钟前",
		type: "info",
		avatar: "mdi:account-circle",
	},
	{
		user: "王芳",
		action: "更新了会员定价策略",
		time: "1 小时前",
		type: "warning",
		avatar: "mdi:account-circle",
	},
	{
		user: "系统",
		action: "自动备份任务已完成",
		time: "2 小时前",
		type: "success",
		avatar: "mdi:server",
	},
];

const revenueBreakdown = {
	series: [45, 28, 18, 9],
	labels: ["订阅收入", "增值服务", "广告分成", "其他"],
	details: [
		{ label: "订阅收入", value: 57850, color: "#3b82f6" },
		{ label: "增值服务", value: 35980, color: "#10b981" },
		{ label: "广告分成", value: 23120, color: "#f59e42" },
		{ label: "其他", value: 11610, color: "#6366f1" },
	],
};

const recentTransactions = [
	{ id: "TXN-2024-12846", merchant: "阿里巴巴云计算", amount: 12580, type: "income", time: "今天 14:32" },
	{ id: "TXN-2024-12845", merchant: "腾讯云服务", amount: 8960, type: "income", time: "今天 11:20" },
	{ id: "TXN-2024-12844", merchant: "服务器运维费用", amount: -3500, type: "expense", time: "今天 09:15" },
	{ id: "TXN-2024-12843", merchant: "字节跳动广告", amount: 5680, type: "income", time: "昨天 16:45" },
	{ id: "TXN-2024-12842", merchant: "员工工资发放", amount: -45800, type: "expense", time: "昨天 10:00" },
];

function TrendIndicator({ value, label }: { value: number; label?: string }) {
	const isPositive = value > 0;
	const isNegative = value < 0;
	
	return (
		<span className={`inline-flex items-center gap-1 text-xs font-semibold ${isPositive ? "text-success" : isNegative ? "text-error" : "text-muted-foreground"}`}>
			{isPositive ? (
				<Icon icon="mdi:arrow-up" size={14} />
			) : isNegative ? (
				<Icon icon="mdi:arrow-down" size={14} />
			) : null}
			{isPositive ? "+" : ""}{Math.abs(value)}%
			{label && <span className="text-muted-foreground font-normal ml-1">{label}</span>}
		</span>
	);
}

function ActivityBadge({ type }: { type: string }) {
	const variants: Record<string, string> = {
		success: "bg-success/10 text-success",
		warning: "bg-warning/10 text-warning",
		info: "bg-primary/10 text-primary",
		error: "bg-error/10 text-error",
	};
	
	return <Badge variant="secondary" className={variants[type] || variants.info}>●</Badge>;
}

export default function Workbench() {
	const [activeTab, setActiveTab] = useState("全部");

	const chartOptions = useChart({
		xaxis: { categories: monthlyRevenue.categories },
		chart: { toolbar: { show: false } },
		grid: { show: false },
		stroke: { curve: "smooth", width: 2 },
		dataLabels: { enabled: false },
		yaxis: { 
			show: true,
			labels: {
				formatter: (value: number) => `¥${(value / 1000).toFixed(0)}k`,
			},
		},
		legend: { show: true, position: "top" as const },
		colors: ["#3b82f6", "#f59e42"],
	});

	const donutOptions = useChart({
		labels: revenueBreakdown.labels,
		legend: { show: false },
		dataLabels: { enabled: false },
		plotOptions: { pie: { donut: { size: "65%" } } },
		colors: ["#3b82f6", "#10b981", "#f59e42", "#6366f1"],
	});

	return (
		<div className="flex flex-col gap-5 w-full">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<Title as="h4" className="text-2xl font-bold">
						工作台概览
					</Title>
					<Text variant="body2" className="text-muted-foreground mt-1">
						查看您的业务关键指标和最新动态
					</Text>
				</div>
				<div className="flex items-center gap-2">
					<Text variant="caption" className="text-muted-foreground">
						最后更新: 今天 14:30
					</Text>
					<Button size="sm" variant="outline">
						<Icon icon="mdi:refresh" className="mr-1" size={16} />
						刷新数据
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{quickStats.map((stat) => (
					<Card key={stat.label} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
						<CardContent className="p-5">
							<div className="flex items-start justify-between mb-4">
								<div className="flex items-center gap-3">
									<div 
										className="rounded-xl p-2.5" 
										style={{ background: rgbAlpha(stat.color, 0.1) }}
									>
										<Icon icon={stat.icon} size={22} color={stat.color} />
									</div>
									<div>
										<Text variant="body2" className="text-muted-foreground font-medium">
											{stat.label}
										</Text>
									</div>
								</div>
								<TrendIndicator value={stat.percent} label={stat.description} />
							</div>
							<div className="flex items-end justify-between">
								<Title as="h3" className="text-2xl font-bold">
									{stat.value}
								</Title>
								<div className="w-24 h-10">
									<Chart
										type="area"
										height={40}
										options={useChart({
											chart: { sparkline: { enabled: true } },
											colors: [stat.color],
											grid: { show: false },
											yaxis: { show: false },
											tooltip: { enabled: false },
											fill: {
												type: "gradient",
												gradient: {
													shadeIntensity: 1,
													opacityFrom: 0.4,
													opacityTo: 0.1,
												},
											},
										})}
										series={[{ data: stat.chart }]}
									/>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
				<Card className="lg:col-span-2 border-none shadow-md">
					<CardHeader className="pb-2">
						<div className="flex items-center justify-between">
							<CardTitle>
								<Title as="h5" className="text-lg font-semibold">
									年度营收趋势
								</Title>
							</CardTitle>
							<div className="flex items-center gap-3">
								<TrendIndicator value={monthlyRevenue.percent} label="同比增长" />
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<div className="h-64">
							<Chart type="area" height={260} options={chartOptions} series={monthlyRevenue.series} />
						</div>
					</CardContent>
				</Card>

				<Card className="border-none shadow-md">
					<CardHeader className="pb-2">
						<CardTitle>
							<Title as="h5" className="text-lg font-semibold">
								{projectOverview.name}
							</Title>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-between mb-2">
							<Text variant="body2" className="text-muted-foreground">
								整体进度
							</Text>
							<Text variant="body2" className="font-bold text-primary">
								{projectOverview.progress}%
							</Text>
						</div>
						<Progress value={projectOverview.progress} className="h-2 mb-5" />
						
						<div className="space-y-3">
							{projectOverview.milestones.map((milestone) => (
								<div key={milestone.label} className="flex items-center gap-3">
									<div 
										className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
											milestone.completed 
												? "bg-success text-white" 
												: "border-2"
										}`}
										style={!milestone.completed ? { borderColor: milestone.color } : {}}
									>
										{milestone.completed && <Icon icon="mdi:check" size={12} />}
									</div>
									<Text 
										variant="body2" 
										className={milestone.completed ? "text-muted-foreground line-through" : "font-medium"}
									>
										{milestone.label}
									</Text>
								</div>
							))}
						</div>
						
						<Button className="w-full mt-5" size="sm" variant="outline">
							<Icon icon="mdi:plus" className="mr-1" size={16} />
							添加新里程碑
						</Button>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
				<Card className="lg:col-span-2 border-none shadow-md">
					<CardHeader className="pb-2">
						<div className="flex items-center justify-between">
							<CardTitle>
								<Title as="h5" className="text-lg font-semibold">
									最近交易
								</Title>
							</CardTitle>
							<div className="flex gap-1">
								{["全部", "收入", "支出"].map((tab) => (
									<Button
										key={tab}
										size="sm"
										variant={activeTab === tab ? "default" : "ghost"}
										onClick={() => setActiveTab(tab)}
										className="h-8 px-3"
									>
										{tab}
									</Button>
								))}
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<div className="space-y-1">
							{recentTransactions.map((tx) => (
								<div 
									key={tx.id} 
									className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-muted/50 transition-colors"
								>
									<div className="flex items-center gap-3">
										<div className={`w-10 h-10 rounded-full flex items-center justify-center ${
											tx.type === "income" 
												? "bg-success/10" 
												: "bg-error/10"
										}`}>
											<Icon 
												icon={tx.type === "income" ? "mdi:arrow-down-left" : "mdi:arrow-up-right"} 
												size={20}
												color={tx.type === "income" ? "#10b981" : "#ef4444"}
											/>
										</div>
										<div>
											<Text variant="body2" className="font-semibold">
												{tx.merchant}
											</Text>
											<Text variant="caption" className="text-muted-foreground">
												{tx.id} · {tx.time}
											</Text>
										</div>
									</div>
									<div className="text-right">
										<Text 
											variant="body2" 
											className={`font-bold ${
												tx.type === "income" ? "text-success" : "text-error"
											}`}
										>
											{tx.amount > 0 ? "+" : ""}¥{Math.abs(tx.amount).toLocaleString()}
										</Text>
									</div>
								</div>
							))}
						</div>
						
						<div className="flex items-center justify-between mt-4 pt-4 border-t">
							<Button variant="outline" size="sm">
								查看全部交易
							</Button>
							<Button size="sm">
								<Icon icon="mdi:plus" className="mr-1" size={16} />
								新建交易
							</Button>
						</div>
					</CardContent>
				</Card>

				<Card className="border-none shadow-md">
					<CardHeader className="pb-2">
						<CardTitle>
							<Title as="h5" className="text-lg font-semibold">
								收入构成
							</Title>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex justify-center mb-4">
							<div className="w-48 h-48">
								<Chart 
									type="donut" 
									height={192} 
									options={donutOptions} 
									series={revenueBreakdown.series} 
								/>
							</div>
						</div>
						
						<div className="space-y-3">
							{revenueBreakdown.details.map((item) => (
								<div key={item.label} className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<span 
											className="inline-block w-3 h-3 rounded-full"
											style={{ background: item.color }}
										/>
										<Text variant="body2" className="font-medium">
											{item.label}
										</Text>
									</div>
									<Text variant="body2" className="font-bold">
										¥{item.value.toLocaleString()}
									</Text>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			<Card className="border-none shadow-md">
				<CardHeader className="pb-2">
					<div className="flex items-center justify-between">
						<CardTitle>
							<Title as="h5" className="text-lg font-semibold">
								最近动态
							</Title>
						</CardTitle>
						<Button variant="ghost" size="sm">
							查看全部
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{recentActivities.map((activity, index) => (
							<div 
								key={index} 
								className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
							>
								<div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
									<Icon icon={activity.avatar} size={20} className="text-muted-foreground" />
								</div>
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2">
										<Text variant="body2" className="font-semibold">
											{activity.user}
										</Text>
										<ActivityBadge type={activity.type} />
									</div>
									<Text variant="body2" className="text-muted-foreground mt-0.5">
										{activity.action}
									</Text>
									<Text variant="caption" className="text-muted-foreground">
										{activity.time}
									</Text>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
