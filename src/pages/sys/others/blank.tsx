import { NAV_SECTION_ITEMS, NavHorizontal, NavMini, NavVertical } from "@/components/nav";
import { ScrollArea, ScrollBar } from "@/ui/scroll-area";

export default function BlankPage() {
	return (
		<div>
			<div className="flex gap-4">
				<div className="h-[400px] flex flex-col justify-start border p-2">
					<ScrollArea type="scroll" className="w-72 h-full flex flex-col">
						<NavVertical data={NAV_SECTION_ITEMS} />
					</ScrollArea>
				</div>

				<div className="h-[400px] flex flex-col justify-start border p-2">
					<ScrollArea type="scroll" className="h-full flex flex-col">
						<NavMini data={NAV_SECTION_ITEMS} />
					</ScrollArea>
				</div>
			</div>

			<div className="border p-2 w-fit">
				<ScrollArea className="w-96 whitespace-nowrap">
					<NavHorizontal data={NAV_SECTION_ITEMS} />
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</div>
		</div>
	);
}
