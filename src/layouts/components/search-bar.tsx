import { Icon } from "@/components/icon";
import useLocale from "@/locales/use-locale";
import { useRouter } from "@/routes/hooks";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandSeparator } from "@/ui/command";
import { ScrollArea } from "@/ui/scroll-area";
import { Text } from "@/ui/typography";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useBoolean } from "react-use";
import { useFilteredNavData } from "../dashboard/nav";

interface SearchItem {
	key: string;
	label: string;
	path: string;
}

// 高亮文本组件
const HighlightText = ({ text, query }: { text: string; query: string }) => {
	if (!query) return <>{text}</>;

	const parts = text.split(new RegExp(`(${query})`, "gi"));

	return (
		<>
			{parts.map((part, i) =>
				part.toLowerCase() === query.toLowerCase() ? (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<span key={i} className="text-primary">
						{part}
					</span>
				) : (
					part
				),
			)}
		</>
	);
};

const SearchBar = () => {
	const { t } = useLocale();
	const { replace } = useRouter();
	const [open, setOpen] = useBoolean(false);
	const [searchQuery, setSearchQuery] = useState("");
	const navData = useFilteredNavData();

	// Flatten navigation data into searchable items
	const flattenedItems = useMemo(() => {
		const items: SearchItem[] = [];

		const flattenItems = (navItems: typeof navData) => {
			for (const section of navItems) {
				for (const item of section.items) {
					if (item.path) {
						items.push({
							key: item.path,
							label: item.title,
							path: item.path,
						});
					}
					if (item.children) {
						flattenItems([{ items: item.children }]);
					}
				}
			}
		};

		flattenItems(navData);
		return items;
	}, [navData]);

	const searchResult = useMemo(() => {
		const query = searchQuery.toLowerCase();
		return flattenedItems.filter((item) => t(item.label).toLowerCase().includes(query) || item.key.toLowerCase().includes(query));
	}, [searchQuery, t, flattenedItems]);

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open: boolean) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, [setOpen]);

	const handleSelect = useCallback(
		(path: string) => {
			replace(path);
			setOpen(false);
		},
		[replace, setOpen],
	);

	return (
		<>
			<Button variant="ghost" className="bg-action-selected px-2 rounded-lg" size="sm" onClick={() => setOpen(true)}>
				<div className="flex items-center justify-center gap-4">
					<Icon icon="local:ic-search" size="20" />
					<kbd className="flex items-center justify-center rounded-md bg-primary/80 text-common-white px-1.5 py-0.5 text-sm font-semibold">
						<Icon icon="qlementine-icons:key-cmd-16" />
						<span>K</span>
					</kbd>
				</div>
			</Button>

			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Type a command or search..." value={searchQuery} onValueChange={setSearchQuery} />
				<ScrollArea className="h-[400px]">
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Navigations">
						{searchResult.map(({ key, label }) => (
							<CommandItem key={key} onSelect={() => handleSelect(key)} className="flex flex-col items-start">
								<div className="font-medium">
									<HighlightText text={t(label)} query={searchQuery} />
								</div>
								<div className="text-xs text-muted-foreground">
									<HighlightText text={key} query={searchQuery} />
								</div>
							</CommandItem>
						))}
					</CommandGroup>
				</ScrollArea>
				<CommandSeparator />
				<div className="flex flex-wrap text-text-primary p-2 justify-end gap-2">
					<div className="flex items-center gap-1">
						<Badge variant="info">↑</Badge>
						<Badge variant="info">↓</Badge>
						<Text variant="caption">to navigate</Text>
					</div>
					<div className="flex items-center gap-1">
						<Badge variant="info">↵</Badge>
						<Text variant="caption">to select</Text>
					</div>
					<div className="flex items-center gap-1">
						<Badge variant="info">ESC</Badge>
						<Text variant="caption">to close</Text>
					</div>
				</div>
			</CommandDialog>
		</>
	);
};

export default SearchBar;
