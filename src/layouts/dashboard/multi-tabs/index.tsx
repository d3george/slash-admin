import { Tabs } from "antd";
import {
	DragDropContext,
	Draggable,
	Droppable,
	type OnDragEndResponder,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { useThemeToken } from "@/theme/hooks";
import { TabItem } from "./components/tab-item";
import { useMultiTabsStyle } from "./hooks/use-tab-style";
import { useMultiTabsContext } from "./providers/multi-tabs-provider";
import type { KeepAliveTab } from "./types";
import { replaceDynamicParams } from "@/router/hooks/use-current-route-meta";
import { useRouter } from "@/router/hooks";

export default function MultiTabs({
	offsetTop = false,
}: { offsetTop: boolean }) {
	const scrollContainer = useRef<HTMLDivElement>(null);
	const tabContentRef = useRef(null);

	const [hoveringTabKey, setHoveringTabKey] = useState("");
	const { tabs, activeTabRoutePath, setTabs, closeTab } = useMultiTabsContext();
	const style = useMultiTabsStyle(offsetTop);
	const themeToken = useThemeToken();
	const { push } = useRouter();

	const getTabStyle = (tab: KeepAliveTab) => {
		const isActive =
			tab.key === activeTabRoutePath || tab.key === hoveringTabKey;

		return {
			borderRadius: "8px 8px 0 0",
			borderWidth: "1px",
			borderStyle: "solid",
			borderColor: themeToken.colorBorderSecondary,
			backgroundColor: isActive
				? themeToken.colorBgContainer
				: themeToken.colorBgLayout,
			color: isActive ? themeToken.colorPrimaryText : "inherit",
			transition:
				"color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
		};
	};

	const tabItems = tabs.map((tab) => ({
		key: tab.key,
		label: (
			<TabItem
				tab={tab}
				isActive={tab.key === activeTabRoutePath}
				isHovering={tab.key === hoveringTabKey}
				onMouseEnter={() => setHoveringTabKey(tab.key)}
				onMouseLeave={() => setHoveringTabKey("")}
				style={getTabStyle(tab)}
				onClose={() => closeTab(tab.key)}
			/>
		),
		children: (
			<div ref={tabContentRef} key={tab.timeStamp}>
				{tab.children}
			</div>
		),
	}));

	const onDragEnd: OnDragEndResponder = ({ destination, source }) => {
		if (!destination) return;
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		const newTabs = Array.from(tabs);
		const [movedTab] = newTabs.splice(source.index, 1);
		newTabs.splice(destination.index, 0, movedTab);

		setTabs([...newTabs]);
	};

	const handleTabClick = ({ key, params = {} }: KeepAliveTab) => {
		const tabKey = replaceDynamicParams(key, params);
		push(tabKey);
	};

	useEffect(() => {
		if (!scrollContainer.current) return;

		const index = tabs.findIndex((tab) => tab.key === activeTabRoutePath);
		const currentTabElement = scrollContainer.current.querySelector(
			`#tab-${index}`,
		);
		if (currentTabElement) {
			currentTabElement.scrollIntoView({
				block: "nearest",
				behavior: "smooth",
			});
		}
	}, [activeTabRoutePath, tabs]);

	useEffect(() => {
		const container = scrollContainer.current;
		if (!container) return;

		const handleWheel = (e: WheelEvent) => {
			e.preventDefault();
			container.scrollLeft += e.deltaY;
		};

		container.addEventListener("mouseenter", () => {
			container.addEventListener("wheel", handleWheel);
		});

		container.addEventListener("mouseleave", () => {
			container.removeEventListener("wheel", handleWheel);
		});

		return () => {
			container.removeEventListener("wheel", handleWheel);
		};
	}, []);

	const renderTabBar = () => (
		<div style={style} className="z-20 w-full">
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="tabs" direction="horizontal">
					{(provided) => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							className="flex w-full overflow-visible items-center h-[34px]"
						>
							<div
								ref={scrollContainer}
								className="hide-scrollbar flex w-full px-2 flex-shrink-0 items-center h-full"
							>
								{tabs.map((tab, index) => (
									<div
										id={`tab-${index}`}
										key={tab.key}
										className="flex-shrink-0"
										onClick={() => handleTabClick(tab)}
									>
										<Draggable
											key={tab.key}
											draggableId={tab.key}
											index={index}
										>
											{(dragProvided) => (
												<div
													ref={dragProvided.innerRef}
													{...dragProvided.draggableProps}
													{...dragProvided.dragHandleProps}
													className="w-auto"
												>
													{tabItems.find((item) => item.key === tab.key)?.label}
												</div>
											)}
										</Draggable>
									</div>
								))}
							</div>
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);

	return (
		<StyledMultiTabs>
			<Tabs
				size="small"
				type="card"
				tabBarGutter={4}
				activeKey={activeTabRoutePath}
				items={tabItems}
				renderTabBar={renderTabBar}
			/>
		</StyledMultiTabs>
	);
}

const StyledMultiTabs = styled.div`
  height: 100%;
  margin-top: 2px;
  
  .anticon {
    margin: 0px !important;
  }
  
  .ant-tabs {
    height: 100%;
    .ant-tabs-content {
      height: 100%;
    }
    .ant-tabs-tabpane {
      height: 100%;
      & > div {
        height: 100%;
      }
    }
  }

  .hide-scrollbar {
    overflow: scroll;
    flex-shrink: 0;
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
