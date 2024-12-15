import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { USER_LIST } from "@/_mock/assets";
import type { KeepAliveTab } from "../types";

export function useTabLabelRender() {
	const { t } = useTranslation();

	const specialTabRenderMap = useMemo<
		Record<string, (tab: KeepAliveTab) => React.ReactNode>
	>(
		() => ({
			"sys.menu.system.user_detail": (tab: KeepAliveTab) => {
				const userId = tab.params?.id;
				const defaultLabel = t(tab.label);
				if (userId) {
					const user = USER_LIST.find((item) => item.id === userId);
					return `${user?.username}-${defaultLabel}`;
				}
				return defaultLabel;
			},
		}),
		[t],
	);

	const renderTabLabel = (tab: KeepAliveTab) => {
		const specialRender = specialTabRenderMap[tab.label];
		if (specialRender) {
			return specialRender(tab);
		}
		return t(tab.label);
	};

	return renderTabLabel;
}
