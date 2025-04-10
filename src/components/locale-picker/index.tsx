import useLocale, { LANGUAGE_MAP } from "@/locales/use-locale";
import { Dropdown } from "antd";

import { Icon, IconButton } from "../icon";

import type { MenuProps } from "antd";
import type { LocalEnum } from "#/enum";

type Locale = keyof typeof LocalEnum;

/**
 * Locale Picker
 */
export default function LocalePicker() {
	const { setLocale, locale } = useLocale();

	const localeList: MenuProps["items"] = Object.values(LANGUAGE_MAP).map((item) => {
		return {
			key: item.locale,
			label: item.label,
			icon: <Icon icon={`local:${item.icon}`} size="20" className="rounded-md" />,
		};
	});

	return (
		<Dropdown
			placement="bottomRight"
			trigger={["click"]}
			menu={{ items: localeList, onClick: (e) => setLocale(e.key as Locale) }}
		>
			<IconButton className="h-10 w-10 hover:scale-105">
				<Icon icon={`local:${LANGUAGE_MAP[locale].icon}`} size="24" className="rounded-md" />
			</IconButton>
		</Dropdown>
	);
}
