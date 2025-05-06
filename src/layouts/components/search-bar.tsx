import { Icon } from "@/components/icon";
import { useFlattenedRoutes, useRouter } from "@/router/hooks";
import { themeVars } from "@/theme/theme.css";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "@/ui/dialog";
import { Input } from "@/ui/input";
import { ScrollArea } from "@/ui/scroll-area";
import { rgbAlpha } from "@/utils/theme";
import { Empty } from "antd";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useBoolean, useEvent, useKeyPressEvent } from "react-use";
import styled from "styled-components";

const SearchBar = () => {
	const { t } = useTranslation();
	const { replace } = useRouter();
	const listRef = useRef<HTMLDivElement>(null);
	const [search, toggle] = useBoolean(false);
	const flattenedRoutes = useFlattenedRoutes();
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedItemIndex, setSelectedItemIndex] = useState(0);

	const activeStyle: CSSProperties = {
		border: `1px dashed ${themeVars.colors.palette.primary.default}`,
		backgroundColor: rgbAlpha(themeVars.colors.palette.primary.defaultChannel, 0.1),
	};

	const searchResult = useMemo(() => {
		return flattenedRoutes.filter(
			(item) =>
				t(item.label).toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.key.toLowerCase().includes(searchQuery.toLowerCase()),
		);
	}, [searchQuery, t, flattenedRoutes]);

	// biome-ignore lint/correctness/useExhaustiveDependencies:  在搜索结果变化时重置选中索引
	useEffect(() => {
		setSelectedItemIndex(0);
	}, [searchResult.length]);

	const handleMetaK = (event: KeyboardEvent) => {
		if (event.metaKey && event.key === "k") {
			// https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/metaKey
			handleOpen();
		}
	};
	useEvent("keydown", handleMetaK);

	useKeyPressEvent("ArrowUp", (event) => {
		if (!search) return;
		event.preventDefault();
		let nextIndex = selectedItemIndex - 1;
		if (nextIndex < 0) {
			nextIndex = searchResult.length - 1;
		}
		setSelectedItemIndex(nextIndex);
		scrollSelectedItemIntoView(nextIndex);
	});

	useKeyPressEvent("ArrowDown", (event) => {
		if (!search) return;
		event.preventDefault();
		let nextIndex = selectedItemIndex + 1;
		if (nextIndex > searchResult.length - 1) {
			nextIndex = 0;
		}
		setSelectedItemIndex(nextIndex);
		scrollSelectedItemIntoView(nextIndex);
	});

	useKeyPressEvent("Enter", (event) => {
		if (!search || searchResult.length === 0) return;
		event.preventDefault();
		const selectItem = searchResult[selectedItemIndex].key;
		if (selectItem) {
			handleSelect(selectItem);
			toggle(false);
		}
	});

	useKeyPressEvent("Escape", () => {
		handleCancel();
	});

	const handleOpen = () => {
		toggle(true);
		setSearchQuery("");
		setSelectedItemIndex(0);
	};
	const handleCancel = () => {
		toggle(false);
	};

	const scrollSelectedItemIntoView = (index: number) => {
		if (listRef.current) {
			const selectedItem = listRef.current.children[index];
			selectedItem.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	};

	const handleHover = (index: number) => {
		if (index === selectedItemIndex) return;
		setSelectedItemIndex(index);
	};

	const handleSelect = (key: string) => {
		replace(key);
		handleCancel();
	};

	return (
		<Dialog open={search} onOpenChange={toggle}>
			<DialogTrigger asChild>
				<div className="flex items-center justify-center">
					<Button variant="ghost" className="bg-secondary px-2 rounded-lg" size="sm" onClick={handleOpen}>
						<div className="flex items-center justify-center gap-2">
							<Icon icon="local:ic-search" size="20" />
							<span className="flex h-6 items-center justify-center rounded-md bg-common-white px-1.5 font-bold text-gray-800">
								{" "}
								⌘K{" "}
							</span>
						</div>
					</Button>
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogDescription>
						<Input
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search..."
							autoFocus
						/>
					</DialogDescription>
				</DialogHeader>

				<div className="h-[30vh]">
					{searchResult.length === 0 ? (
						<Empty />
					) : (
						<ScrollArea className="h-full">
							<div ref={listRef} className="py-2">
								{searchResult.map(({ key, label }, index) => {
									const partsTitle = parse(t(label), match(t(label), searchQuery));
									const partsKey = parse(key, match(key, searchQuery));
									return (
										<StyledListItemButton
											key={key}
											style={index === selectedItemIndex ? activeStyle : {}}
											onClick={() => handleSelect(key)}
											onMouseMove={() => handleHover(index)}
										>
											<div className="flex justify-between">
												<div>
													<div className="font-medium">
														{partsTitle.map((item) => (
															<span
																key={item.text}
																style={{
																	color: item.highlight
																		? themeVars.colors.palette.primary.default
																		: themeVars.colors.text.primary,
																}}
															>
																{item.text}
															</span>
														))}
													</div>
													<div className="text-xs">
														{partsKey.map((item) => (
															<span
																key={item.text}
																style={{
																	color: item.highlight
																		? themeVars.colors.palette.primary.default
																		: themeVars.colors.text.secondary,
																}}
															>
																{item.text}
															</span>
														))}
													</div>
												</div>
											</div>
										</StyledListItemButton>
									);
								})}
							</div>
						</ScrollArea>
					)}
				</div>

				<DialogFooter>
					<div className="flex flex-wrap text-text-primary">
						<div className="flex">
							<Badge variant="info">↑</Badge>
							<Badge variant="info">↓</Badge>
							<span>to navigate</span>
						</div>
						<div className="flex">
							<Badge variant="info">↵</Badge>
							<span>to select</span>
						</div>
						<div className="flex">
							<Badge variant="info">ESC</Badge>
							<span>to close</span>
						</div>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

const StyledListItemButton = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: 100%;
  padding: 8px 16px;
  border-radius: 8px;
  color: ${themeVars.colors.text.secondary};
`;

export default SearchBar;
