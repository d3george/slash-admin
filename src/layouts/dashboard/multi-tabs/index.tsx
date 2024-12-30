import { useRouter } from "@/router/hooks";
import { replaceDynamicParams } from "@/router/hooks/use-current-route-meta";
import { DndContext, type DragEndEvent, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, rectSwappingStrategy } from "@dnd-kit/sortable";

import { Tabs } from "antd";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { SortableTabItem } from "./components/sortable-tab-item";
import { useMultiTabsStyle } from "./hooks/use-tab-style";
import { useMultiTabsContext } from "./providers/multi-tabs-provider";
import type { KeepAliveTab } from "./types";

export default function MultiTabs({ offsetTop = false }: { offsetTop: boolean }) {
	const scrollContainer = useRef<HTMLDivElement>(null);

	const { tabs, activeTabRoutePath, setTabs } = useMultiTabsContext();
	const style = useMultiTabsStyle(offsetTop);
	const { push } = useRouter();

	const handleTabClick = ({ key, params = {} }: KeepAliveTab) => {
		console.log("handleTabClick", key, params);
		const tabKey = replaceDynamicParams(key, params);
		push(tabKey);
	};

	useEffect(() => {
		if (!scrollContainer.current) return;
		const tab = tabs.find((item) => item.key === activeTabRoutePath);
		const currentTabElement = scrollContainer.current.querySelector(`#tab${tab?.key.split("/").join("-")}`);
		if (currentTabElement) {
			currentTabElement.scrollIntoView({
				block: "nearest",
				behavior: "smooth",
			});
		}
	}, [tabs, activeTabRoutePath]);

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

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 5, // 需要移动 5px 才会开始拖拽
				// 或者使用时间约束
				// delay: 100, // 需要按住 100ms 才会开始拖拽
			},
		}),
	);
	const handleDragEnd = (event: DragEndEvent) => {
		console.log("handleDragEnd", event);
		const { active, over } = event;
		if (!over || active.id === over.id) return;

		const oldIndex = tabs.findIndex((tab) => tab.key === active.id);
		const newIndex = tabs.findIndex((tab) => tab.key === over.id);

		const newTabs = Array.from(tabs);
		const [movedTab] = newTabs.splice(oldIndex, 1);
		newTabs.splice(newIndex, 0, movedTab);

		setTabs([...newTabs]);
	};
	// 添加约束修饰符
	const restrictToHorizontalAxis = ({ transform }: any) => {
		return {
			...transform,
			y: 0, // 将垂直方向的移动固定为 0
		};
	};
	const renderTabBar = () => (
		<div style={style}>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
				modifiers={[restrictToHorizontalAxis]}
			>
				<SortableContext items={tabs.map((tab) => tab.key)} strategy={rectSwappingStrategy}>
					<div className="flex w-full overflow-visible items-center relative">
						<div ref={scrollContainer} className="hide-scrollbar flex w-full px-2 flex-shrink-0 items-center h-full">
							{tabs.map((tab) => (
								<div className="flex-shrink-0" key={tab.key} onClick={() => handleTabClick(tab)}>
									<SortableTabItem tab={tab} />
								</div>
							))}
						</div>
					</div>
				</SortableContext>
			</DndContext>
		</div>
	);

	const tabItems = tabs.map((tab) => ({
		key: tab.key,
		label: tab.label,
		children: <div key={tab.timeStamp}>{tab.children}</div>,
	}));

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
    will-change: transform;
 
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
