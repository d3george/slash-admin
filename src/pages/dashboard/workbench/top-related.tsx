import { Tag, Typography } from "antd";

import Card from "@/components/card";
import { Iconify } from "@/components/icon";
import Scrollbar from "@/components/scrollbar";
import { themeVars } from "@/theme/theme.css";
import { Rate } from "antd";

const dataSource = [
	{
		logo: <Iconify icon="logos:chrome" size={24} />,
		title: "Chrome",
		platform: "Mac",
		type: "free",
		star: 4,
		reviews: "9.91k",
	},
	{
		logo: <Iconify icon="logos:google-drive" size={24} />,
		title: "Drive",
		platform: "Mac",
		type: "free",
		star: 3.5,
		reviews: "1.95k",
	},
	{
		logo: <Iconify icon="logos:dropbox" size={24} />,
		title: "Dropbox",
		platform: "Windows",
		type: "$66.71",
		star: 4.5,
		reviews: "9.12k",
	},
	{
		logo: <Iconify icon="logos:slack-icon" size={24} />,
		title: "Slack",
		platform: "Mac",
		type: "free",
		star: 3.5,
		reviews: "6.98k",
	},
	{
		logo: <Iconify icon="logos:discord-icon" size={24} />,
		title: "Discord",
		platform: "Windows",
		type: "$52.17",
		star: 0.5,
		reviews: "8.49k",
	},
];
export default function TopRelated() {
	return (
		<Card className="flex-col">
			<header className="self-start">
				<Typography.Title level={5}>Top Related Applications</Typography.Title>
			</header>
			<main className="w-full">
				<Scrollbar>
					{dataSource.map((item) => (
						<div className="mb-4 flex" key={item.title}>
							<div
								className="mr-2 flex items-center justify-center"
								style={{
									background: `rgba(${themeVars.colors.background.defaultChannel}, .4)`,
									borderRadius: "12px",
									width: "48px",
									height: "48px",
								}}
							>
								{item.logo}
							</div>

							<div className="flex flex-col">
								<span className="font-medium">{item.title}</span>
								<div className="flex items-center justify-center text-gray">
									{item.platform === "Mac" ? (
										<Iconify icon="wpf:mac-os" size={12} />
									) : (
										<Iconify icon="mingcute:windows-fill" size={12} />
									)}
									<span className="mx-1 text-xs font-light">{item.platform}</span>
									<Tag color={item.type === "free" ? "green" : "red"}>{item.type}</Tag>
								</div>
							</div>

							<div className="ml-auto flex flex-col self-center">
								<Rate allowHalf disabled defaultValue={item.star} />
								<span className="mt-1 text-right text-xs text-gray-400">{item.reviews}reviews</span>
							</div>
						</div>
					))}
				</Scrollbar>
			</main>
		</Card>
	);
}
