import { Button } from "@/ui/button";
import { Tabs, type TabsProps } from "antd";
import BackgroundView from "./views/background";
import Inview from "./views/inview";
import ScrollView from "./views/scroll";

export default function AnimatePage() {
	const TABS: TabsProps["items"] = [
		{ key: "inview", label: "In View", children: <Inview /> },
		{ key: "scroll", label: "Scroll", children: <ScrollView /> },
		{ key: "background", label: "Background", children: <BackgroundView /> },
	];

	return (
		<>
			<Button variant="link" asChild className="mb-4 block text-primary!">
				<a href="https://www.framer.com/motion/" target="_blank" rel="noreferrer">
					https://www.framer.com/motion/
				</a>
			</Button>
			<Tabs items={TABS} type="card" />
		</>
	);
}
