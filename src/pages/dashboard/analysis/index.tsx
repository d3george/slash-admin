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
import { Link } from "react-router";

// ---------------------- 数据区 ----------------------
const timeOptions = [
	{ label: "本周", value: "day" },
	{ label: "本月", value: "week" },
	{ label: "全部", value: "month" },
];

// 所有数据都按 day/week/month 维度组织
const dashboardData = {
	visitor: {
		day: { value: 149328, change: 5.2, tip: "vs 上周" },
		week: { value: 749853, change: 8.4, tip: "vs 上月" },
		month: { value: 1749853, change: 12.4, tip: "vs 上年" },
	},
	conversionRate: {
		day: { value: 7, change: -1.8, tip: "vs 上周" },
		week: { value: 10, change: 0.2, tip: "vs 上月" },
		month: { value: 124, change: 0.8, tip: "vs 上年" },
	},
	adCampaign: {
		day: { value: 17333, change: 2.3, tip: "vs 上周" },
		week: { value: 114987, change: 6.1, tip: "vs 上月" },
		month: { value: 214987, change: 15.6, tip: "vs 上年" },
	},
	sharingMeeting: {
		day: { value: 18, change: 2.3, tip: "vs 上周" },
		week: { value: 58, change: 6.1, tip: "vs 上月" },
		month: { value: 98, change: 15.6, tip: "vs 上年" },
	},
	sessionDevices: {
		day: [
			{ label: "未开始", value: 42.1, color: "#3b82f6", icon: "mdi:desktop-mac" },
			{ label: "正在学", value: 33.7, color: "#f59e42", icon: "mdi:run" },
			{ label: "已学完", value: 19.6, color: "#06f743ff", icon: "mdi:done" },
		],
		week: [
			{ label: "未开始", value: 42.1, color: "#3b82f6", icon: "mdi:desktop-mac" },
			{ label: "正在学", value: 33.7, color: "#f59e42", icon: "mdi:run" },
			{ label: "已学完", value: 19.6, color: "#06f743ff", icon: "mdi:done" },
		],
		month: [
			{ label: "未开始", value: 42.1, color: "#3b82f6", icon: "mdi:desktop-mac" },
			{ label: "正在学", value: 33.7, color: "#f59e42", icon: "mdi:run" },
			{ label: "已学完", value: 19.6, color: "#06f743ff", icon: "mdi:done" },
		],
	},
	topChannels: {
		day: [
			{ name: "张医生", percent: "神经影像", total: 131, icon: "mdi:user" },
			{ name: "王医生", percent: "心血管影像", total: 98, icon: "mdi:user" },
			{ name: "李医生", percent: "腹部影像", total: 89, icon: "mdi:user" },
			{ name: "赵医生", percent: "儿科影像", total: 18, icon: "mdi:user" },
		],
		week: [
			{ name: "张医生", percent: "神经影像", total: 131, icon: "mdi:user" },
			{ name: "王医生", percent: "心血管影像", total: 98, icon: "mdi:user" },
			{ name: "李医生", percent: "腹部影像", total: 89, icon: "mdi:user" },
			{ name: "赵医生", percent: "儿科影像", total: 18, icon: "mdi:user" },
		],
		month: [
			{ name: "张医生", percent: "神经影像", total: 131, icon: "mdi:user" },
			{ name: "王医生", percent: "心血管影像", total: 98, icon: "mdi:user" },
			{ name: "李医生", percent: "腹部影像", total: 89, icon: "mdi:user" },
			{ name: "赵医生", percent: "儿科影像", total: 18, icon: "mdi:user" },
		],
	},
	trafficData: {
		day: [
			{
				meeting_topic: "真性及假性动脉瘤",
				meeting_type: "晨读会",
				discription: "围绕真性及假性动脉瘤的影像学表现进行分享和讨论，旨在提高大家对该疾病的认识和诊断能力。",
				date: "2024年10月15日（星期二）上午9:00-10:00",
				case: 3,
				progress: 60,
			},
			{
				meeting_topic: "腹部创伤",
				meeting_type: "分享会",
				discription: "急诊腹部创伤的影像学快速诊断要点，重点介绍实质性脏器损伤的CT分级及处理原则。",
				date: "2024年10月19日（星期六）下午15:00-16:00",
				case: 2,
				progress: 55,
			},
			{
				meeting_topic: "脊柱退行性变",
				meeting_type: "小讲课",
				discription: "脊柱退行性病变的MRI诊断及临床意义，涵盖椎间盘突出、椎管狭窄等常见疾病。",
				date: "2024年10月20日（星期日）上午9:30-10:30",
				case: 3,
				progress: 68,
			},
			{
				meeting_topic: "骨骼系统肿瘤",
				meeting_type: "分享会",
				discription: "骨骼系统常见肿瘤及肿瘤样病变的影像学特征及鉴别诊断，涵盖良恶性病变的诊断要点。",
				date: "2024年10月24日（星期四）上午10:00-11:00",
				case: 5,
				progress: 45,
			},
		],
		week: [
			{
				meeting_topic: "妇科疾病",
				meeting_type: "疑难病例讨论",
				discription: "妇科常见疾病的影像学诊断，重点介绍盆腔炎症、肿瘤等疾病的MRI诊断要点。",
				date: "2024年10月25日（星期五）下午15:00-16:30",
				case: 6,
				progress: 59,
			},
			{
				meeting_topic: "肝脏局灶性病变",
				meeting_type: "小讲课",
				discription:
					"深入探讨肝脏常见局灶性病变的影像学特点及鉴别诊断要点，包括肝血管瘤、肝细胞癌、转移瘤等疾病的CT和MRI表现。",
				date: "2024年10月16日（星期三）下午14:00-15:30",
				case: 5,
				progress: 75,
			},
			{
				meeting_topic: "肺结节影像分析",
				meeting_type: "疑难病例讨论",
				discription: "针对临床送检的疑难肺结节病例进行多学科讨论，结合影像学特征、临床表现及病理结果进行综合分析。",
				date: "2024年10月17日（星期四）上午10:00-11:30",
				case: 4,
				progress: 80,
			},
			{
				meeting_topic: "脑血管病变",
				meeting_type: "晨读会",
				discription: "系统讲解脑血管常见病变的影像学诊断思路，包括脑梗死、脑出血、动脉瘤及血管畸形等疾病的表现。",
				date: "2024年10月18日（星期五）上午9:00-10:00",
				case: 6,
				progress: 40,
			},
			{
				meeting_topic: "真性及假性动脉瘤",
				meeting_type: "晨读会",
				discription: "围绕真性及假性动脉瘤的影像学表现进行分享和讨论，旨在提高大家对该疾病的认识和诊断能力。",
				date: "2024年10月15日（星期二）上午9:00-10:00",
				case: 3,
				progress: 60,
			},
			{
				meeting_topic: "腹部创伤",
				meeting_type: "分享会",
				discription: "急诊腹部创伤的影像学快速诊断要点，重点介绍实质性脏器损伤的CT分级及处理原则。",
				date: "2024年10月19日（星期六）下午15:00-16:00",
				case: 2,
				progress: 55,
			},
			{
				meeting_topic: "脊柱退行性变",
				meeting_type: "小讲课",
				discription: "脊柱退行性病变的MRI诊断及临床意义，涵盖椎间盘突出、椎管狭窄等常见疾病。",
				date: "2024年10月20日（星期日）上午9:30-10:30",
				case: 3,
				progress: 68,
			},
			{
				meeting_topic: "骨骼系统肿瘤",
				meeting_type: "分享会",
				discription: "骨骼系统常见肿瘤及肿瘤样病变的影像学特征及鉴别诊断，涵盖良恶性病变的诊断要点。",
				date: "2024年10月24日（星期四）上午10:00-11:00",
				case: 5,
				progress: 45,
			},
		],
		month: [
			{
				meeting_topic: "消化道肿瘤",
				meeting_type: "疑难病例讨论",
				discription: "消化道肿瘤的影像学诊断及分期评估，结合内镜、CT、MRI等多种检查手段进行综合分析。",
				date: "2024年10月21日（星期一）下午14:00-15:30",
				case: 7,
				progress: 62,
			},
			{
				meeting_topic: "乳腺疾病",
				meeting_type: "晨读会",
				discription: "乳腺常见疾病的影像学诊断思路，包括乳腺增生、炎症、良恶性肿瘤的鉴别要点。",
				date: "2024年10月22日（星期二）上午9:00-10:00",
				case: 4,
				progress: 78,
			},
			{
				meeting_topic: "泌尿系结石",
				meeting_type: "小讲课",
				discription: "泌尿系结石的影像学诊断及并发症评估，重点介绍CT在结石诊断中的应用价值。",
				date: "2024年10月23日（星期三）下午14:30-15:30",
				case: 3,
				progress: 82,
			},
			{
				meeting_topic: "妇科疾病",
				meeting_type: "疑难病例讨论",
				discription: "妇科常见疾病的影像学诊断，重点介绍盆腔炎症、肿瘤等疾病的MRI诊断要点。",
				date: "2024年10月25日（星期五）下午15:00-16:30",
				case: 6,
				progress: 59,
			},
			{
				meeting_topic: "肝脏局灶性病变",
				meeting_type: "小讲课",
				discription:
					"深入探讨肝脏常见局灶性病变的影像学特点及鉴别诊断要点，包括肝血管瘤、肝细胞癌、转移瘤等疾病的CT和MRI表现。",
				date: "2024年10月16日（星期三）下午14:00-15:30",
				case: 5,
				progress: 75,
			},
			{
				meeting_topic: "肺结节影像分析",
				meeting_type: "疑难病例讨论",
				discription: "针对临床送检的疑难肺结节病例进行多学科讨论，结合影像学特征、临床表现及病理结果进行综合分析。",
				date: "2024年10月17日（星期四）上午10:00-11:30",
				case: 4,
				progress: 80,
			},
			{
				meeting_topic: "脑血管病变",
				meeting_type: "晨读会",
				discription: "系统讲解脑血管常见病变的影像学诊断思路，包括脑梗死、脑出血、动脉瘤及血管畸形等疾病的表现。",
				date: "2024年10月18日（星期五）上午9:00-10:00",
				case: 6,
				progress: 40,
			},
			{
				meeting_topic: "真性及假性动脉瘤",
				meeting_type: "晨读会",
				discription: "围绕真性及假性动脉瘤的影像学表现进行分享和讨论，旨在提高大家对该疾病的认识和诊断能力。",
				date: "2024年10月15日（星期二）上午9:00-10:00",
				case: 3,
				progress: 60,
			},
			{
				meeting_topic: "腹部创伤",
				meeting_type: "分享会",
				discription: "急诊腹部创伤的影像学快速诊断要点，重点介绍实质性脏器损伤的CT分级及处理原则。",
				date: "2024年10月19日（星期六）下午15:00-16:00",
				case: 2,
				progress: 55,
			},
			{
				meeting_topic: "脊柱退行性变",
				meeting_type: "小讲课",
				discription: "脊柱退行性病变的MRI诊断及临床意义，涵盖椎间盘突出、椎管狭窄等常见疾病。",
				date: "2024年10月20日（星期日）上午9:30-10:30",
				case: 3,
				progress: 68,
			},
			{
				meeting_topic: "骨骼系统肿瘤",
				meeting_type: "分享会",
				discription: "骨骼系统常见肿瘤及肿瘤样病变的影像学特征及鉴别诊断，涵盖良恶性病变的诊断要点。",
				date: "2024年10月24日（星期四）上午10:00-11:00",
				case: 5,
				progress: 45,
			},
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
	const visitor = dashboardData.visitor[timeType];
	const conversionRate = dashboardData.conversionRate[timeType];
	const adCampaign = dashboardData.adCampaign[timeType];
	const sharingMeeting = dashboardData.sharingMeeting[timeType];
	const sessionDevices = dashboardData.sessionDevices[timeType];
	const topChannels = dashboardData.topChannels[timeType];
	const trafficData = dashboardData.trafficData[timeType];

	const deviceChartOptions = useChart({
		labels: sessionDevices.map((d) => d.label),
		stroke: {
			show: false,
		},
		legend: {
			show: false,
		},
		tooltip: {
			fillSeriesColor: true,
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
						读片会看板
					</Title>
					<Text variant="body2" className="text-muted-foreground">
						查看历史会议以及预约新的医学影像读片会
					</Text>
				</div>
				<div className="flex items-center gap-2">
					<Text variant="body2" className="text-muted-foreground">
						检索时间:
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
				<Card className="col-span-1 h-full">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle>
							<Title as="h2" className="text-xl">
								晨读片
							</Title>
						</CardTitle>
						<CardAction className="rounded-full bg-orange-200 p-2 w-10 h-10 flex items-center justify-center">
							<Icon icon="mdi:users" size={20} color="black" />
						</CardAction>
					</CardHeader>
					<CardContent>
						<Title as="h3" className="text-xl">
							{visitor.value.toLocaleString()} 次
						</Title>
						<div className="flex flex-row gap-2 items-center">
							<Trend value={visitor.change} />
							<Text variant="caption" className="text-muted-foreground flex items-center">
								{visitor.tip}
							</Text>
						</div>
					</CardContent>
				</Card>
				<Card className="col-span-1">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle>
							<Title as="h2" className="text-xl">
								小讲课
							</Title>
						</CardTitle>
						<CardAction className="rounded-full bg-emerald-200 p-2 w-10 h-10 flex items-center justify-center">
							<Icon icon="ph:seal-percent-fill" size={20} color="black" />
						</CardAction>
					</CardHeader>
					<CardContent>
						<Title as="h3" className="text-xl">
							{conversionRate.value} 场
						</Title>
						<div className="flex flex-row gap-2 items-center">
							<Trend value={conversionRate.change} />
							<Text variant="caption" className="text-muted-foreground flex items-center">
								{conversionRate.tip}
							</Text>
						</div>
					</CardContent>
				</Card>
				<Card className="col-span-1">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle>
							<Title as="h2" className="text-xl">
								疑难病例讨论
							</Title>
						</CardTitle>
						<CardAction className="rounded-full bg-purple-200 p-2 w-10 h-10 flex items-center justify-center">
							<Icon icon="heroicons-solid:cursor-click" size={20} color="black" />
						</CardAction>
					</CardHeader>
					<CardContent>
						<Title as="h3" className="text-xl">
							{adCampaign.value.toLocaleString()} 例
						</Title>
						<div className="flex flex-row gap-2 items-center">
							<Trend value={adCampaign.change} />
							<Text variant="caption" className="text-muted-foreground flex items-center">
								{adCampaign.tip}
							</Text>
						</div>
					</CardContent>
				</Card>
				<Card className="col-span-1">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle>
							<Title as="h2" className="text-xl">
								分享会
							</Title>
						</CardTitle>
						<CardAction className="rounded-full bg-blue-200 p-2 w-10 h-10 flex items-center justify-center">
							<Icon icon="heroicons-solid:chat" size={20} color="black" />
						</CardAction>
					</CardHeader>
					<CardContent>
						<Title as="h3" className="text-xl">
							{sharingMeeting.value.toLocaleString()} 例
						</Title>
						<div className="flex flex-row gap-2 items-center">
							<Trend value={sharingMeeting.change} />
							<Text variant="caption" className="text-muted-foreground flex items-center">
								{sharingMeeting.tip}
							</Text>
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-12 gap-4">
				{/* Traffic data 表格 */}
				<Card className="col-span-12">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle>
							<Title as="h4" className="text-lg">
								会议一览
							</Title>
						</CardTitle>
						<CardAction>
							<Link to="/calendar">
								<Button size="sm" variant="default">
									<Icon icon="mdi:download" className="mr-1" />
									预约会议
								</Button>
							</Link>
						</CardAction>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto">
							<table className="w-full text-sm">
								<thead>
									<tr>
										<th className="p-2">会议主题</th>
										<th className="p-2">会议类型</th>
										<th className="p-2">会议描述</th>
										<th className="p-2">日期</th>
										<th className="p-2">病例数</th>
										<th className="p-2">学习率 (%)</th>
									</tr>
								</thead>
								<tbody>
									{trafficData.map((row) => (
										<tr key={row.meeting_topic} className="border-t">
											<td className="p-2 text-left">
												<Link to="/kanban" className="text-blue hover:underline">
													{row.meeting_topic}
												</Link>
											</td>
											<td className="p-2 text-center">{row.meeting_type}</td>

											<td className="p-2 text-center">
												<Link to="/kanban" className="text-blue hover:underline">
													{row.discription}
												</Link>
											</td>
											<td className="p-2 text-center">{row.date}</td>
											<td className="p-2 text-center">{row.case}</td>
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

				{/* Top pages */}
				<Card className="col-span-12 md:col-span-6 xl:col-span-4">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle>
							<Title as="h3" className="text-lg">
								亚专业
							</Title>
						</CardTitle>
						<CardAction>
							<Button size="sm" variant="outline">
								<Icon icon="mdi:download" className="mr-1" />
								导出数据
							</Button>
						</CardAction>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto">
							<table className="w-full text-sm">
								<thead>
									<tr>
										<th className="text-left py-1">亚专业</th>
										<th className="text-right py-1">热门度(查看量)</th>
										<th className="text-right py-1">课件总量</th>
									</tr>
								</thead>
								<tbody>
									<tr className="border-t">
										<td className="py-2">神经影像</td>
										<td className="py-2">
											<div className="flex items-center gap-2 justify-end">
												85 <Trend value={5.2} />
											</div>
										</td>
										<td className="py-2 text-right">1,240</td>
									</tr>
									<tr className="border-t">
										<td className="py-2">心血管影像</td>
										<td className="py-2">
											<div className="flex items-center gap-2 justify-end">
												78 <Trend value={3.1} />
											</div>
										</td>
										<td className="py-2 text-right">980</td>
									</tr>
									<tr className="border-t">
										<td className="py-2">腹部影像</td>
										<td className="py-2">
											<div className="flex items-center gap-2 justify-end">
												72 <Trend value={-1.2} />
											</div>
										</td>
										<td className="py-2 text-right">1,050</td>
									</tr>
									<tr className="border-t">
										<td className="py-2">骨骼肌肉影像</td>
										<td className="py-2">
											<div className="flex items-center gap-2 justify-end">
												65 <Trend value={2.8} />
											</div>
										</td>
										<td className="py-2 text-right">890</td>
									</tr>
									<tr className="border-t">
										<td className="py-2">乳腺影像</td>
										<td className="py-2">
											<div className="flex items-center gap-2 justify-end">
												58 <Trend value={4.6} />
											</div>
										</td>
										<td className="py-2 text-right">620</td>
									</tr>
									<tr className="border-t">
										<td className="py-2">儿科影像</td>
										<td className="py-2">
											<div className="flex items-center gap-2 justify-end">
												45 <Trend value={-0.8} />
											</div>
										</td>
										<td className="py-2 text-right">430</td>
									</tr>
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
								会议占比
							</Title>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col items-center gap-2">
							<div className="w-full max-w-[180px]">
								<Chart
									type="donut"
									height={320}
									options={deviceChartOptions}
									series={sessionDevices.map((d) => d.value)}
								/>
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
								主讲人
							</Title>
						</CardTitle>
						<CardAction>
							<Button size="sm" variant="outline">
								<Icon icon="mdi:download" className="mr-1" />
								导出数据
							</Button>
						</CardAction>
					</CardHeader>
					<CardContent>
						<table className="w-full text-sm">
							<thead>
								<tr>
									<th className="text-left py-1">主讲人</th>
									<th className="text-right py-1">涉及专业</th>
									<th className="text-right py-1">分享量</th>
								</tr>
							</thead>
							<tbody>
								{topChannels.map((row) => (
									<tr key={row.name} className="border-t">
										<td className="py-2 flex items-center gap-2">
											<Icon icon={row.icon} size={18} />
											{row.name}
										</td>
										<td className="py-2 text-right">{row.percent}</td>
										<td className="py-2 text-right">{row.total.toLocaleString()}</td>
									</tr>
								))}
							</tbody>
						</table>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
