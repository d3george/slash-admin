import avatar1 from "@/assets/images/avatars/avatar-1.png";
import avatar2 from "@/assets/images/avatars/avatar-2.png";
import avatar3 from "@/assets/images/avatars/avatar-3.png";
import avatar4 from "@/assets/images/avatars/avatar-4.png";
import avatar5 from "@/assets/images/avatars/avatar-5.png";
import { Chart, useChart } from "@/components/chart";
import Icon from "@/components/icon/icon";
import { Avatar, AvatarImage } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { Progress } from "@/ui/progress";
import { Text, Title } from "@/ui/typography";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

const projectUsers = [
	{ avatar: avatar1, name: "John" },
	{ avatar: avatar2, name: "Wiliam" },
	{ avatar: avatar3, name: "Kevin" },
	{ avatar: avatar4, name: "Maciej" },
	{ avatar: avatar5, name: "Kamil" },
];

const totalIncome = {
	series: [54, 23, 12, 4],
	labels: ["原发性肝细胞癌", "肝硬化", "假性动脉瘤", "颅脑损伤"], //原发性肝细胞癌
	details: [
		{ label: "原发性肝细胞癌", value: 54 },
		{ label: "肝硬化", value: 23 },
		{ label: "假性动脉瘤", value: 12 },
		{ label: "颅脑损伤", value: 4 },
	],
};

export default function Workbench() {
	const [activeTab, setActiveTab] = useState("已分享");
	const navigate = useNavigate();
	const donutOptions = useChart({
		labels: totalIncome.labels,
		legend: { show: false },
		dataLabels: { enabled: false },
		plotOptions: { pie: { donut: { size: "70%" } } },
	});

	return (
		<div className="flex flex-col gap-4 w-full">
			<div>
				<Title as="h4" className="text-xl mb-1">
					今日会议
				</Title>
				<Text variant="body2" className="text-muted-foreground">
					今日会议安排及学习进度
				</Text>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					<Card className="flex flex-col gap-4 p-4">
						<Text variant="body2" className="font-semibold  mb-2">
							今日晨读会：真性及假性动脉瘤
						</Text>
						<div className="flex items-center justify-between mb-2">
							<Text variant="body2">学习率</Text>
							<span className="text-xs font-bold text-blue-500">80%</span>
						</div>
						<Progress value={80} />
						<ul className="flex flex-col gap-2 mt-2 mb-4">
							<li className="flex items-center gap-2">
								<span className="inline-block w-2 h-2 rounded-full" style={{ background: "#3b82f6" }} />
								<Text variant="body2">会议类型：晨读会</Text>
							</li>
							<li className="flex items-center gap-2">
								<span className="inline-block w-2 h-2 rounded-full" style={{ background: "#3b82f6" }} />
								<Text variant="body2">会议主题：真性及假性动脉瘤</Text>
							</li>
							<li className="flex items-center gap-2">
								<span className="inline-block w-2 h-2 rounded-full" style={{ background: "#3b82f6" }} />
								<Text variant="body2">会议资料：XXX.pptx</Text>
							</li>
							<li className="flex items-center gap-2">
								<span className="inline-block w-2 h-2 rounded-full" style={{ background: "#3b82f6" }} />
								<Text variant="body2">关联病例：5例</Text>
							</li>
						</ul>
						<Link to="/kanban">
							<Button className="w-full mt-auto" size="sm">
								<Icon icon="mdi:eye" size={18} /> 进入会议
							</Button>
						</Link>
					</Card>
					<Card className="flex flex-col gap-4 p-4">
						<Text variant="body2" className="font-semibold  mb-2">
							今日小讲课：真性及假性动脉瘤
						</Text>
						<div className="flex items-center justify-between mb-2">
							<Text variant="body2">学习率</Text>
							<span className="text-xs font-bold text-blue-500">80%</span>
						</div>
						<Progress value={80} />
						<ul className="flex flex-col gap-2 mt-2 mb-4">
							<li className="flex items-center gap-2">
								<span className="inline-block w-2 h-2 rounded-full" style={{ background: "#3b82f6" }} />
								<Text variant="body2">会议类型：小讲课</Text>
							</li>
							<li className="flex items-center gap-2">
								<span className="inline-block w-2 h-2 rounded-full" style={{ background: "#3b82f6" }} />
								<Text variant="body2">会议主题：真性及假性动脉瘤</Text>
							</li>
							<li className="flex items-center gap-2">
								<span className="inline-block w-2 h-2 rounded-full" style={{ background: "#3b82f6" }} />
								<Text variant="body2">会议资料：XXX.pptx</Text>
							</li>
							<li className="flex items-center gap-2">
								<span className="inline-block w-2 h-2 rounded-full" style={{ background: "#3b82f6" }} />
								<Text variant="body2">关联病例：5例</Text>
							</li>
						</ul>
						<Link to="/kanban">
							<Button className="w-full mt-auto" size="sm">
								<Icon icon="mdi:eye" size={18} /> 进入会议
							</Button>
						</Link>
					</Card>
					<Card className="flex flex-col gap-4 p-4">
						<Text variant="body2" className="font-semibold  mb-2">
							今日讨论：真性及假性动脉瘤
						</Text>
						<div className="flex items-center justify-between mb-2">
							<Text variant="body2">学习率</Text>
							<span className="text-xs font-bold text-blue-500">80%</span>
						</div>
						<Progress value={80} />
						<ul className="flex flex-col gap-2 mt-2 mb-4">
							<li className="flex items-center gap-2">
								<span className="inline-block w-2 h-2 rounded-full" style={{ background: "#3b82f6" }} />
								<Text variant="body2">会议类型：疑难病例讨论</Text>
							</li>
							<li className="flex items-center gap-2">
								<span className="inline-block w-2 h-2 rounded-full" style={{ background: "#3b82f6" }} />
								<Text variant="body2">会议主题：真性及假性动脉瘤</Text>
							</li>
							<li className="flex items-center gap-2">
								<span className="inline-block w-2 h-2 rounded-full" style={{ background: "#3b82f6" }} />
								<Text variant="body2">会议资料：XXX.pptx</Text>
							</li>
							<li className="flex items-center gap-2">
								<span className="inline-block w-2 h-2 rounded-full" style={{ background: "#3b82f6" }} />
								<Text variant="body2">关联病例：5例</Text>
							</li>
						</ul>
						<Link to="/kanban">
							<Button className="w-full mt-auto" size="sm">
								<Icon icon="mdi:eye" size={18} /> 进入会议
							</Button>
						</Link>
					</Card>
					<Card className="flex flex-col gap-4 p-6 items-center justify-center">
						<Text variant="body2" className="font-semibold mb-2">
							预约会议
						</Text>
						<div className="flex -space-x-2 mb-2">
							{projectUsers.map((user) => (
								<Avatar key={user.name} className="inline-block w-8 h-8 rounded-full">
									<AvatarImage src={user.avatar} />
								</Avatar>
							))}
						</div>
						<Button
							className="flex items-center justify-center"
							variant="contrast"
							onClick={() => navigate("/calendar")}
						>
							<Icon icon="mdi:plus" size={20} />
							预约会议
						</Button>
					</Card>
				</div>
			</div>
			<div>
				<Title as="h4" className="text-xl mb-1">
					本周病例
				</Title>
				<Text variant="body2" className="text-muted-foreground">
					近期新增的病例一览
				</Text>
				{/* 项目概览区块 */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
					<Card className="lg:col-span-2 flex flex-col p-6">
						<div className="flex items-center gap-4 mb-4">
							<div className="flex gap-2">
								{["所有", "已分享", "未分享"].map((tab) => (
									<Button
										key={tab}
										size="sm"
										variant={activeTab === tab ? "default" : "secondary"}
										onClick={() => setActiveTab(tab)}
									>
										{tab}
									</Button>
								))}
							</div>
						</div>
						<div className="flex-1 overflow-x-auto">
							<div className="overflow-x-auto">
								<table className="w-full text-sm">
									<thead>
										<tr>
											<th className="text-left py-1">病例描述</th>
											<th className="text-right py-1">热门度(查看量)</th>
											<th className="text-right py-1">关联课件</th>
										</tr>
									</thead>
									<tbody>
										<tr className="border-t">
											<td className="py-2">
												男-58岁，肝癌术后复查，CT扫描,肝脏S6段见一5.8cmx4.5cm不规则低密度影，动脉期环形强化，门脉期及延迟期强化减低，考虑肝癌复发可能。
											</td>
											<td className="py-2">
												<div className="flex items-center gap-2 justify-end text-green-500">
													85 <Icon icon="mdi:arrow-up" size={14} />
												</div>
											</td>
											<td className="py-2 text-right">40</td>
										</tr>
										<tr className="border-t">
											<td className="py-2">
												女-38岁，乳腺肿块，超声检查，左乳中外上象限见一2.0cmx1.5cm低回声结节，边界欠清，CDFI未见明显血流信号，考虑良性病变可能。
											</td>
											<td className="py-2">
												<div className="flex items-center gap-2 justify-end text-green-500">
													78 <Icon icon="mdi:arrow-up" size={14} />
												</div>
											</td>
											<td className="py-2 text-right">68</td>
										</tr>
										<tr className="border-t">
											<td className="py-2">
												男-45岁，头痛眩晕，MRI检查，脑部多发斑点状高信号影，DWI显示部分病灶受限，考虑多发性脑梗塞可能。
											</td>
											<td className="py-2">
												<div className="flex items-center gap-2 justify-end text-green-500">
													72 <Icon icon="mdi:arrow-up" size={14} />
												</div>
											</td>
											<td className="py-2 text-right">40</td>
										</tr>
										<tr className="border-t">
											<td className="py-2">
												男-91岁，腹痛呕吐，CT检查，腹部见一巨大囊性肿块，内见多发隔膜及液平面，考虑囊性肿瘤可能。
											</td>
											<td className="py-2">
												<div className="flex items-center gap-2 justify-end text-green-500">
													65 <Icon icon="mdi:arrow-up" size={14} />
												</div>
											</td>
											<td className="py-2 text-right">33</td>
										</tr>
										<tr className="border-t">
											<td className="py-2">
												女-76岁，咳嗽气促，CT检查，双肺多发磨玻璃密度影，部分病灶边缘模糊，考虑感染性病变可能。
											</td>
											<td className="py-2">
												<div className="flex items-center gap-2 justify-end text-green-500">
													58 <Icon icon="mdi:arrow-up" size={14} />
												</div>
											</td>
											<td className="py-2 text-right">33</td>
										</tr>
										<tr className="border-t">
											<td className="py-2">
												女-6岁，儿科影像片，腹部X线平片，见右上腹部一巨大囊性肿块，边界清晰，考虑良性囊肿可能。
											</td>
											<td className="py-2">
												<div className="flex items-center gap-2 justify-end text-red-500">
													45 <Icon icon="mdi:arrow-down" size={14} />
												</div>
											</td>
											<td className="py-2 text-right">20</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div className="flex items-center justify-between mt-4 gap-2">
							<Button variant="outline" className="flex-1" onClick={() => navigate("/case")}>
								查看全部
							</Button>
						</div>
					</Card>
					<Card className="flex flex-col p-6">
						<Text variant="body2" className="font-semibold  mb-2">
							热门病例
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
										<span className="font-bold">{item.value.toLocaleString()}</span>
									</div>
								))}
							</div>
							<Button className="flex items-center justify-center" variant="contrast" onClick={() => navigate("/case")}>
								<Icon icon="mdi:plus" size={20} />
								新增病例
							</Button>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}
