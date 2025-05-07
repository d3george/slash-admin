import { Button } from "@/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import BackgroundView from "./views/background";
import Inview from "./views/inview";
import ScrollView from "./views/scroll";

export default function AnimatePage() {
	const TABS = [
		{ value: "inview", label: "In View", content: <Inview /> },
		{ value: "scroll", label: "Scroll", content: <ScrollView /> },
		{ value: "background", label: "Background", content: <BackgroundView /> },
	];

	return (
		<>
			<Button variant="link" asChild className="mb-4 block text-primary!">
				<a href="https://www.framer.com/motion/" target="_blank" rel="noreferrer">
					https://www.framer.com/motion/
				</a>
			</Button>
			<Tabs defaultValue={TABS[0].value}>
				<TabsList>
					{TABS.map((tab) => (
						<TabsTrigger key={tab.value} value={tab.value}>
							{tab.label}
						</TabsTrigger>
					))}
				</TabsList>
				{TABS.map((tab) => (
					<TabsContent key={tab.value} value={tab.value}>
						{tab.content}
					</TabsContent>
				))}
			</Tabs>
		</>
	);
}
