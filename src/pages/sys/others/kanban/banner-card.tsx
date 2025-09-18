import bgImg from "@/assets/images/background/banner-1.png";
import Character from "@/assets/images/characters/character_3.png";
import { Icon } from "@/components/icon";
import { Button } from "@/ui/button";
import { Text, Title } from "@/ui/typography";
import type { CSSProperties } from "react";

export default function BannerCard() {
	const bgStyle: CSSProperties = {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		// !  When passing a URL of SVG to a manually constructed url() by JS, the variable should be wrapped within double quotes.
		// ! https://vite.dev/guide/assets.html
		backgroundImage: `url("${bgImg}")`,
		backgroundSize: "100%",
		backgroundPosition: "50%",
		backgroundRepeat: "no-repeat",
		opacity: 0.5,
	};
	return (
		<div className="relative bg-primary/90">
			<div className="p-6 z-2 relative">
				<div className="grid grid-cols-2 gap-4">
					<div className="col-span-2 md:col-span-1">
						<div className="flex flex-col gap-4">
							<Title as="h2" className="text-white">
								会议主题：真性及假性动脉瘤读片分享
							</Title>
							<Text className="text-white">
								会议描述：本次会议的主要内容是围绕真性及假性动脉瘤的影像学表现进行分享和讨论，旨在提高大家对该疾病的认识和诊断能力。会议将涵盖病例分析、影像特征解读以及最新的研究进展，欢迎各位同仁积极参与，共同探讨这一重要课题。
							</Text>
							<Text className="text-white">会议日期：2024年10月15日（星期二）上午9:00-10:00</Text>
							<div className="flex items-center gap-4 text-white">
								<Button
									variant="outline"
									className="w-fit bg-white text-black"
									onClick={() => window.open("https://test/fXemAXVNDa")}
								>
									<Icon icon="carbon:logo-discord" size={24} />
									<span className="ml-2 font-black">打开课件</span>
								</Button>

								<Button
									variant="outline"
									className="w-fit bg-white text-black"
									onClick={() => window.open("https://test/fXemAXVNDa")}
								>
									<Icon icon="carbon:logo-discord" size={24} />
									<span className="ml-2 font-black">查看其他资料</span>
								</Button>
							</div>
						</div>
					</div>

					<div className="col-span-2 md:col-span-1">
						<div className="w-full h-full flex items-center justify-end">
							<img src={Character} className="w-56 h-56" alt="character" />
						</div>
					</div>
				</div>
			</div>
			<div style={bgStyle} className="z-1" />
		</div>
	);
}
