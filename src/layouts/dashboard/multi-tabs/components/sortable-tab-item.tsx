import { themeVars } from "@/theme/theme.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMultiTabsContext } from "../providers/multi-tabs-provider";
import type { KeepAliveTab } from "../types";
import { TabItem } from "./tab-item";

type Props = {
	tab: KeepAliveTab;
};

export const SortableTabItem = ({ tab }: Props) => {
	const { activeTabRoutePath, closeTab } = useMultiTabsContext();
	const isActive = tab.key === activeTabRoutePath;
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id: tab.key,
		data: {
			type: "tab",
			tab,
		},
	});

	const style = {
		transform: CSS.Translate.toString(transform),
		transition,
		border: "1px solid",
		borderRadius: "8px 8px 0 0",
		borderColor: `rgba(${themeVars.colors.palette.gray["500Channel"]}, 0.2)`,
		color: isActive ? themeVars.colors.palette.primary.default : "inherit",
	};

	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners} id={`tab${tab.key.split("/").join("-")}`}>
			<TabItem tab={tab} isActive={isActive} isHovering={false} onClose={() => closeTab(tab.key)} />
		</div>
	);
};
