import avatar1 from "@/assets/images/avatars/avatar-1.png";
import avatar2 from "@/assets/images/avatars/avatar-2.png";
import avatar3 from "@/assets/images/avatars/avatar-3.png";
import avatar4 from "@/assets/images/avatars/avatar-4.png";
import avatar5 from "@/assets/images/avatars/avatar-5.png";
import { Chart, useChart } from "@/components/chart";
import Icon from "@/components/icon/icon";
import { GLOBAL_CONFIG } from "@/global-config";
import { Avatar, AvatarImage } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";
import { Progress } from "@/ui/progress";
import { Text, Title } from "@/ui/typography";
import { rgbAlpha } from "@/utils/theme";
import { useState } from "react";
import BannerCard from "./banner-card";

const quickStats = [
	{
		icon: "solar:wallet-outline",
		label: "All Earnings",
		value: "$3,020",
		percent: 30.6,
		color: "#3b82f6",
		chart: [12, 18, 14, 16, 12, 10, 14, 18, 16, 14, 12, 10],
	},
	{
		icon: "solar:graph-outline",
		label: "Page Views",
		value: "290K+",
		percent: 30.6,
		color: "#f59e42",
		chart: [8, 12, 10, 14, 18, 16, 14, 12, 10, 14, 18, 16],
	},
	{
		icon: "solar:checklist-outline",
		label: "Total Task",
		value: "839",
		percent: 0,
		color: "#10b981",
		chart: [10, 14, 12, 16, 18, 14, 12, 10, 14, 18, 16, 12],
	},
	{
		icon: "solar:download-outline",
		label: "Download",
		value: "2,067",
		percent: -30.6,
		color: "#ef4444",
		chart: [16, 14, 12, 10, 14, 18, 16, 12, 10, 14, 18, 16],
	},
];

const monthlyRevenue = {
	series: [
		{
			name: "Revenue",
			data: [30, 40, 35, 50, 49, 70, 91, 60, 50, 55, 60, 65],
		},
	],
	categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	percent: 5.44,
};

const projectTasks = [
	{ label: "Horizontal Layout", color: "#3b82f6" },
	{ label: "Invoice Generator", color: "#f59e42" },
	{ label: "Package Upgrades", color: "#fbbf24" },
	{ label: "Figma Auto Layout", color: "#10b981" },
];

const projectUsers = [
	{ avatar: avatar1, name: "John" },
	{ avatar: avatar2, name: "Wiliam" },
	{ avatar: avatar3, name: "Kevin" },
	{ avatar: avatar4, name: "Maciej" },
	{ avatar: avatar5, name: "Kamil" },
];
const transactions = [
	{ icon: "mdi:spotify", name: "Spotify Music", id: "#T11032", amount: 10000, time: "06:30 pm", status: "up" },
	{ icon: "mdi:medium", name: "Medium", id: "#T11032", amount: -26, time: "08:30 pm", status: "down" },
	{ icon: "mdi:uber", name: "Uber", id: "#T11032", amount: 210000, time: "08:40 pm", status: "up" },
	{ icon: "mdi:taxi", name: "Ola Cabs", id: "#T11032", amount: 210000, time: "07:40 pm", status: "up" },
];

const totalIncome = {
	series: [44, 55, 41, 17],
	labels: ["Income", "Download", "Rent", "Views"],
	details: [
		{ label: "Income", value: 23876 },
		{ label: "Download", value: 23876 },
		{ label: "Rent", value: 23876 },
		{ label: "Views", value: 23876 },
	],
};

export default function Workbench() {
	const [activeTab, setActiveTab] = useState("All Transaction");
	const chartOptions = useChart({
		xaxis: { categories: monthlyRevenue.categories },
		chart: { toolbar: { show: false } },
		grid: { show: false },
		stroke: { curve: "smooth" },
		dataLabels: { enabled: false },
		yaxis: { show: false },
		legend: { show: false },
	});
	const donutOptions = useChart({
		labels: totalIncome.labels,
		legend: { show: false },
		dataLabels: { enabled: false },
		plotOptions: { pie: { donut: { size: "70%" } } },
	});

	// throw new Error("test error"); // 注释掉直接抛错，改用演示组件

	return (
		<div className="flex flex-col gap-4 w-full">
			<BannerCard />
			{/* 顶部四个统计卡片 */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{quickStats.map((stat) => (
					<Card key={stat.label} className="flex flex-col justify-between h-full">
						<CardContent className="flex flex-col gap-2 p-4">
							<div className="flex items-center gap-2">
								<div className="rounded-lg p-2" style={{ background: rgbAlpha(stat.color, 0.1) }}>
									<Icon icon={stat.icon} size={24} color={stat.color} />
								</div>
								<Text variant="body2" className="font-semibold">
									{stat.label}
								</Text>
							</div>
							<div className="flex items-center gap-2 mt-2">
								<Title as="h3" className="text-2xl font-bold">
									{stat.value}
								</Title>
								<span
									className={`text-xs flex items-center gap-1 font-bold ${stat.percent > 0 ? "text-green-500" : stat.percent < 0 ? "text-red-500" : ""}`}
								>
									{stat.percent > 0 ? (
										<Icon icon="mdi:arrow-up" size={16} />
									) : stat.percent < 0 ? (
										<Icon icon="mdi:arrow-down" size={16} />
									) : null}
									{stat.percent !== 0 ? `${Math.abs(stat.percent)}%` : stat.label === "Total Task" ? "New" : null}
								</span>
							</div>
							<div className="w-full h-10 mt-2">
								<Chart
									type="bar"
									height={40}
									options={useChart({
										chart: { sparkline: { enabled: true } },
										colors: [stat.color],
										grid: { show: false },
										yaxis: { show: false },
										tooltip: { enabled: false },
									})}
									series={[{ data: stat.chart }]}
								/>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* 月度收入+项目进度区块 */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				<Card className="lg:col-span-2">
					<CardContent className="p-6">
						<div className="flex items-center justify-between mb-2">
							<Text variant="body2" className="font-semibold">
								Monthly Revenue
							</Text>
							<span className="flex items-center gap-1 text-green-500 font-bold text-sm">
								<Icon icon="mdi:arrow-up" size={16} />
								{monthlyRevenue.percent}%
							</span>
						</div>
						<Chart type="area" height={220} options={chartOptions} series={monthlyRevenue.series} />
					</CardContent>
				</Card>
				<Card className="flex flex-col gap-4 p-6">
					<Text variant="body2" className="font-semibold  mb-2">
						Project - {GLOBAL_CONFIG.appName}
					</Text>
					<div className="flex items-center justify-between mb-2">
						<Text variant="body2">Release v1.2.0</Text>
						<span className="text-xs font-bold text-blue-500">70%</span>
					</div>
					<Progress value={70} />
					<ul className="flex flex-col gap-2 mt-2 mb-4">
						{projectTasks.map((task) => (
							<li key={task.label} className="flex items-center gap-2">
								<span className="inline-block w-2 h-2 rounded-full" style={{ background: task.color }} />
								<Text variant="body2">{task.label}</Text>
							</li>
						))}
					</ul>
					<Button className="w-full mt-auto" size="sm">
						<Icon icon="mdi:plus" size={18} /> Add task
					</Button>
				</Card>
			</div>

			{/* 项目概览区块 */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				<Card className="lg:col-span-2 flex flex-col gap-4 p-6">
					<Text variant="body2" className="font-semibold mb-2">
						Project overview
					</Text>
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<div>
							<Text variant="body2">Total Tasks</Text>
							<Title as="h3" className="text-xl font-bold">
								34,686
							</Title>
						</div>
						<div>
							<Text variant="body2">Pending Tasks</Text>
							<Title as="h3" className="text-xl font-bold">
								3,786
							</Title>
						</div>
						<div className="flex-1 flex items-center justify-end">
							<Button className="w-48" size="sm" variant="default">
								<Icon icon="mdi:plus" size={18} /> Add project
							</Button>
						</div>
					</div>
					<div className="w-full h-16 mt-4">
						<Chart
							type="line"
							height={60}
							options={useChart({
								chart: { sparkline: { enabled: true } },
								colors: ["#ef4444"],
								grid: { show: false },
								yaxis: { show: false },
								tooltip: { enabled: false },
							})}
							series={[{ data: [10, 20, 15, 30, 25, 40, 35, 20] }]}
						/>
					</div>
				</Card>
				<Card className="flex flex-col gap-4 p-6 items-center justify-center">
					<Text variant="body2" className="font-semibold mb-2">
						{GLOBAL_CONFIG.appName}
					</Text>
					<div className="flex -space-x-2 mb-2">
						{projectUsers.map((user) => (
							<Avatar key={user.name} className="inline-block w-8 h-8 rounded-full">
								<AvatarImage src={user.avatar} />
							</Avatar>
						))}
					</div>
					<Button className="w-10 h-10 rounded-full flex items-center justify-center" size="icon" variant="secondary">
						<Icon icon="mdi:plus" size={20} />
					</Button>
				</Card>
			</div>

			{/* 交易+收入区块 */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				<Card className="lg:col-span-2 flex flex-col p-6">
					<div className="flex items-center gap-4 mb-4">
						<Text variant="body2" className="font-semibold">
							Transactions
						</Text>
						<div className="flex gap-2">
							{["All Transaction", "Success", "Pending"].map((tab) => (
								<Button
									key={tab}
									size="sm"
									variant={activeTab === tab ? "default" : "ghost"}
									onClick={() => setActiveTab(tab)}
								>
									{tab}
								</Button>
							))}
						</div>
					</div>
					<div className="flex-1 overflow-x-auto">
						<table className="w-full text-sm">
							<tbody>
								{transactions.map((tx) => (
									<tr key={tx.name} className="border-b last:border-0">
										<td className="py-2 w-12">
											<span className="inline-flex items-center justify-center w-10 h-10 rounded-full">
												<Icon icon={tx.icon} size={20} />
											</span>
										</td>
										<td className="py-2">
											<div className="font-semibold">{tx.name}</div>
											<div className="text-xs">{tx.id}</div>
										</td>
										<td className="py-2 text-right font-bold">
											{tx.amount > 0 ? "+" : "-"}${Math.abs(tx.amount).toLocaleString()}
										</td>
										<td className="py-2 text-right">
											<span className={`text-xs font-bold ${tx.status === "up" ? "text-green-500" : "text-red-500"}`}>
												{tx.status === "up" ? (
													<Icon icon="mdi:arrow-up" size={14} />
												) : (
													<Icon icon="mdi:arrow-down" size={14} />
												)}{" "}
												{tx.status === "up" ? "+" : "-"}10.6%
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="flex items-center justify-between mt-4 gap-2">
						<Button variant="outline" className="flex-1">
							View all
						</Button>
						<Button className="flex-1">Create new</Button>
					</div>
				</Card>
				<Card className="flex flex-col p-6">
					<Text variant="body2" className="font-semibold  mb-2">
						Total Income
					</Text>
					<div className="flex-1 flex flex-col items-center justify-center">
						<Chart type="donut" height={180} options={donutOptions} series={totalIncome.series} />
						<div className="w-full mt-4">
							{totalIncome.details.map((item, i) => (
								<div key={item.label} className="flex items-center justify-between mb-2">
									<div className="flex items-center gap-2">
										<span
											className={"inline-block w-3 h-3 rounded-full"}
											style={{ background: ["#3b82f6", "#f59e42", "#10b981", "#6366f1"][i] }}
										/>
										<Text variant="body2">{item.label}</Text>
									</div>
									<span className="font-bold">${item.value.toLocaleString()}</span>
								</div>
							))}
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}
