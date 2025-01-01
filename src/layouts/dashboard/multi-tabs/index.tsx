import { useRouter } from "@/router/hooks";
import { replaceDynamicParams } from "@/router/hooks/use-current-route-meta";
import { Tabs } from "antd";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import SortableContainer from "./components/sortable-container";
import { SortableItem } from "./components/sortable-item";
import { TabItem } from "./components/tab-item";
import { useMultiTabsStyle } from "./hooks/use-tab-style";
import { useMultiTabsContext } from "./providers/multi-tabs-provider";
import type { KeepAliveTab } from "./types";

export default function MultiTabs() {
	const scrollContainer = useRef<HTMLUListElement>(null);

	const { tabs, activeTabRoutePath, setTabs } = useMultiTabsContext();
	const style = useMultiTabsStyle();
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

	const handleDragEnd = (oldIndex: number, newIndex: number) => {
		const newTabs = Array.from(tabs);
		const [movedTab] = newTabs.splice(oldIndex, 1);
		newTabs.splice(newIndex, 0, movedTab);

		setTabs([...newTabs]);
	};

	const renderOverlay = (id: string | number) => {
		const tab = tabs.find((tab) => tab.key === id);
		if (!tab) return null;
		return <TabItem tab={tab} />;
	};

	return (
		<StyledMultiTabs>
			<Tabs
				size="small"
				type="card"
				tabBarGutter={4}
				activeKey={activeTabRoutePath}
				items={tabs.map((tab) => ({
					...tab,
					children: <div key={tab.timeStamp}>{tab.children}</div>,
				}))}
				renderTabBar={() => {
					return (
						<div style={style}>
							<SortableContainer items={tabs} onSortEnd={handleDragEnd} renderOverlay={renderOverlay}>
								<ul ref={scrollContainer} className="flex overflow-x-auto w-full px-2 h-[32px] hide-scrollbar">
									{tabs.map((tab) => (
										<SortableItem tab={tab} key={tab.key} onClick={() => handleTabClick(tab)} />
									))}
								</ul>
							</SortableContainer>
						</div>
					);
				}}
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
    scrollbar-width: none;
    -ms-overflow-style: none;
    will-change: transform;
 
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
