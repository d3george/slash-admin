import { Icon } from "@/components/icon";
import useLocale, { LANGUAGE_MAP } from "@/locales/use-locale";
import { Button } from "@/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/dropdown-menu";
import type { LocalEnum } from "#/enum";

type Locale = keyof typeof LocalEnum;

/**
 * Locale Picker
 */
export default function LocalePicker() {
	const { setLocale, locale } = useLocale();

	const localeList = Object.values(LANGUAGE_MAP).map((item) => {
		return {
			key: item.locale,
			label: item.label,
			icon: <Icon icon={`local:${item.icon}`} size="20" className="rounded-md" />,
		};
	});

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="rounded-full">
					<Icon icon={`local:${LANGUAGE_MAP[locale].icon}`} size="20" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{localeList.map((item) => (
					<DropdownMenuItem key={item.key} onClick={() => setLocale(item.key as Locale)}>
						{item.icon}
						{item.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
