import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import ScrollbarView from "./views/scroll-bar";
import ScrollProgressView from "./views/scroll-progress";

export default function ScrollPage() {
	const TABS = [
		{ value: "scrollbar", label: "Scrollbar", content: <ScrollbarView /> },
		{ value: "scroll-progress", label: "Scroll Progress", content: <ScrollProgressView /> },
	];

	return (
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
	);
}
