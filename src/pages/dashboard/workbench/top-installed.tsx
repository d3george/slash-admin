import { Typography } from "antd";
import type { ReactNode } from "react";

import Card from "@/components/card";
import { Iconify } from "@/components/icon";

const dataSource = [
	{
		country: "Germany",
		iconify: "twemoji:flag-germany",
		android: "9.91k",
		windows: "1.95k",
		ios: "1.95k",
	},
	{
		country: "China",
		iconify: "twemoji:flag-china",
		android: "1.95k",
		windows: "9.25k",
		ios: "7.95k",
	},
	{
		country: "Australia",
		iconify: "twemoji:flag-australia",
		android: "3.91k",
		windows: "2.95k",
		ios: "4.95k",
	},
	{
		country: "France",
		iconify: "twemoji:flag-france",
		android: "3.28k",
		windows: "2.29k",
		ios: "8.95k",
	},
	{
		country: "USA",
		iconify: "twemoji:flag-united-states",
		android: "8.81k",
		windows: "7.05k",
		ios: "4.35k",
	},
];

const platformIcon = (platform: string) => {
	let iconify: ReactNode;
	if (platform === "android") {
		iconify = <Iconify icon="uiw:android" />;
	}
	if (platform === "windows") {
		iconify = <Iconify icon="mingcute:windows-fill" />;
	}
	iconify = <Iconify icon="wpf:mac-os" />;

	return <div className="mr-1 text-xs text-gray">{iconify}</div>;
};
export default function TopInstalled() {
	return (
		<Card className="flex-col">
			<header className="self-start">
				<Typography.Title level={5}>Top Installed Countries</Typography.Title>
			</header>
			<main className="w-full">
				{dataSource.map((item) => (
					<div className="mb-4 flex items-center" key={item.country}>
						<Iconify icon={item.iconify} size={30} />
						<span className="mx-2 font-medium">{item.country}</span>
						<div className="ml-auto flex">
							<div className="flex items-center justify-center">
								{platformIcon("android")}
								{item.android}
							</div>

							<div className="mx-2 flex items-center justify-center">
								{platformIcon("windows")}
								{item.windows}
							</div>

							<div className="flex items-center justify-center">
								{platformIcon("ios")}
								{item.ios}
							</div>
						</div>
					</div>
				))}
			</main>
		</Card>
	);
}
