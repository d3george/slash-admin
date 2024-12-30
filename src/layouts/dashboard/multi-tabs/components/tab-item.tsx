import { Iconify } from "@/components/icon";
import { Dropdown, type MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import { MultiTabOperation } from "#/enum";
import { useTabLabelRender } from "../hooks/use-tab-label-render";
import { useMultiTabsContext } from "../providers/multi-tabs-provider";
import type { TabItemProps } from "../types";

export function TabItem({ tab, style, onClose }: TabItemProps) {
	const { t } = useTranslation();
	const { tabs, refreshTab, closeTab, closeOthersTab, closeLeft, closeRight, closeAll } = useMultiTabsContext();

	const renderTabLabel = useTabLabelRender();
	const menuItems: MenuProps["items"] = [
		{
			label: t(`sys.tab.${MultiTabOperation.REFRESH}`),
			key: MultiTabOperation.REFRESH,
			icon: <Iconify icon="mdi:reload" size={18} />,
		},
		{
			label: t(`sys.tab.${MultiTabOperation.CLOSE}`),
			key: MultiTabOperation.CLOSE,
			icon: <Iconify icon="material-symbols:close" size={18} />,
			disabled: tabs.length === 1,
		},
		{
			type: "divider",
		},
		{
			label: t(`sys.tab.${MultiTabOperation.CLOSELEFT}`),
			key: MultiTabOperation.CLOSELEFT,
			icon: <Iconify icon="material-symbols:tab-close-right-outline" size={18} className="rotate-180" />,
			disabled: tabs.findIndex((t) => t.key === tab.key) === 0,
		},
		{
			label: t(`sys.tab.${MultiTabOperation.CLOSERIGHT}`),
			key: MultiTabOperation.CLOSERIGHT,
			icon: <Iconify icon="material-symbols:tab-close-right-outline" size={18} />,
			disabled: tabs.findIndex((t) => t.key === tab.key) === tabs.length - 1,
		},
		{
			type: "divider",
		},
		{
			label: t(`sys.tab.${MultiTabOperation.CLOSEOTHERS}`),
			key: MultiTabOperation.CLOSEOTHERS,
			icon: <Iconify icon="material-symbols:tab-close-outline" size={18} />,
			disabled: tabs.length === 1,
		},
		{
			label: t(`sys.tab.${MultiTabOperation.CLOSEALL}`),
			key: MultiTabOperation.CLOSEALL,
			icon: <Iconify icon="mdi:collapse-all-outline" size={18} />,
		},
	];

	const menuClick = (menuInfo: any) => {
		const { key, domEvent } = menuInfo;
		domEvent.stopPropagation();

		switch (key) {
			case MultiTabOperation.REFRESH:
				refreshTab(tab.key);
				break;
			case MultiTabOperation.CLOSE:
				closeTab(tab.key);
				break;
			case MultiTabOperation.CLOSEOTHERS:
				closeOthersTab(tab.key);
				break;
			case MultiTabOperation.CLOSELEFT:
				closeLeft(tab.key);
				break;
			case MultiTabOperation.CLOSERIGHT:
				closeRight(tab.key);
				break;
			case MultiTabOperation.CLOSEALL:
				closeAll();
				break;
			default:
				break;
		}
	};

	return (
		<Dropdown
			trigger={["contextMenu"]}
			menu={{
				items: menuItems,
				onClick: menuClick,
			}}
		>
			<div className="relative flex select-none items-center px-4 py-1" style={style}>
				<div>{renderTabLabel(tab)}</div>
				{!tab.hideTab && (
					<Iconify
						icon="ion:close-outline"
						size={18}
						className="ml-2 cursor-pointer opacity-50"
						onClick={(e) => {
							e.stopPropagation();
							onClose?.();
						}}
					/>
				)}
			</div>
		</Dropdown>
	);
}
