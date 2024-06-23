import { Dropdown, MenuProps, Tabs, TabsProps } from 'antd';
import Color from 'color';
import { CSSProperties, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable, OnDragEndResponder } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { useToggle, useFullscreen } from 'react-use';
import styled from 'styled-components';

import { USER_LIST } from '@/_mock/assets';
import { Iconify } from '@/components/icon';
import { useRouter } from '@/router/hooks';
import { replaceDynamicParams } from '@/router/hooks/use-current-route-meta';
import { useSettings } from '@/store/settingStore';
import { useResponsive, useThemeToken } from '@/theme/hooks';

import {
  NAV_WIDTH,
  NAV_COLLAPSED_WIDTH,
  HEADER_HEIGHT,
  OFFSET_HEADER_HEIGHT,
  MULTI_TABS_HEIGHT,
  NAV_HORIZONTAL_HEIGHT,
} from '../config';

import { useMultiTabsContext, type KeepAliveTab } from './multi-tabs-provider';

import { MultiTabOperation, ThemeLayout } from '#/enum';

type Props = {
  offsetTop?: boolean;
};
export default function MultiTabs({ offsetTop = false }: Props) {
  const { t } = useTranslation();
  const { push } = useRouter();
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [hoveringTabKey, setHoveringTabKey] = useState('');
  const [openDropdownTabKey, setopenDropdownTabKey] = useState('');
  const themeToken = useThemeToken();

  const tabContentRef = useRef(null);
  const [fullScreen, toggleFullScreen] = useToggle(false);
  useFullscreen(tabContentRef, fullScreen, { onClose: () => toggleFullScreen(false) });

  const {
    tabs,
    activeTabRoutePath,
    setTabs,
    closeTab,
    refreshTab,
    closeOthersTab,
    closeAll,
    closeLeft,
    closeRight,
  } = useMultiTabsContext();

  /**
   * Special Tab Label Render
   *
   * @example
   * /user/:id --> `A-UserDetail`
   */
  const SpecialTabRenderMap: Record<string, (tab: KeepAliveTab) => ReactNode> = useMemo(
    () => ({
      'sys.menu.system.user_detail': (tab: KeepAliveTab) => {
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

  /**
   * tab dropdown下拉选
   */
  const menuItems = useMemo<MenuProps['items']>(
    () => [
      {
        label: t(`sys.tab.${MultiTabOperation.FULLSCREEN}`),
        key: MultiTabOperation.FULLSCREEN,
        icon: <Iconify icon="material-symbols:fullscreen" size={18} />,
      },
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
        type: 'divider',
      },
      {
        label: t(`sys.tab.${MultiTabOperation.CLOSELEFT}`),
        key: MultiTabOperation.CLOSELEFT,
        icon: (
          <Iconify
            icon="material-symbols:tab-close-right-outline"
            size={18}
            className="rotate-180"
          />
        ),
        disabled: tabs.findIndex((tab) => tab.key === openDropdownTabKey) === 0,
      },
      {
        label: t(`sys.tab.${MultiTabOperation.CLOSERIGHT}`),
        key: MultiTabOperation.CLOSERIGHT,
        icon: <Iconify icon="material-symbols:tab-close-right-outline" size={18} />,
        disabled: tabs.findIndex((tab) => tab.key === openDropdownTabKey) === tabs.length - 1,
      },
      {
        type: 'divider',
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
    ],
    [openDropdownTabKey, t, tabs],
  );

  /**
   * tab dropdown click
   */
  const menuClick = useCallback(
    (menuInfo: any, tab: KeepAliveTab) => {
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
        case MultiTabOperation.FULLSCREEN:
          toggleFullScreen();
          break;
        default:
          break;
      }
    },
    [refreshTab, closeTab, closeOthersTab, closeLeft, closeRight, closeAll, toggleFullScreen],
  );

  /**
   * 当前显示dorpdown的tab
   */
  const onOpenChange = (open: boolean, tab: KeepAliveTab) => {
    if (open) {
      setopenDropdownTabKey(tab.key);
    } else {
      setopenDropdownTabKey('');
    }
  };

  /**
   * tab样式
   */
  const calcTabStyle: (tab: KeepAliveTab) => CSSProperties = useCallback(
    (tab) => {
      const isActive = tab.key === activeTabRoutePath || tab.key === hoveringTabKey;
      const result: CSSProperties = {
        borderRadius: '8px 8px 0 0',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: themeToken.colorBorderSecondary,
        backgroundColor: themeToken.colorBgLayout,
        transition:
          'color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      };

      if (isActive) {
        result.backgroundColor = themeToken.colorBgContainer;
        result.color = themeToken.colorPrimaryText;
      }
      return result;
    },
    [activeTabRoutePath, hoveringTabKey, themeToken],
  );

  /**
   * 渲染单个tab
   */
  const renderTabLabel = useCallback(
    (tab: KeepAliveTab) => {
      if (tab.hideTab) return null;
      return (
        <Dropdown
          trigger={['contextMenu']}
          menu={{ items: menuItems, onClick: (menuInfo) => menuClick(menuInfo, tab) }}
          onOpenChange={(open) => onOpenChange(open, tab)}
        >
          <div
            className="relative mx-px flex select-none items-center px-4 py-1"
            style={calcTabStyle(tab)}
            onMouseEnter={() => {
              if (tab.key === activeTabRoutePath) return;
              setHoveringTabKey(tab.key);
            }}
            onMouseLeave={() => setHoveringTabKey('')}
          >
            <div>
              {SpecialTabRenderMap[tab.label] ? SpecialTabRenderMap[tab.label](tab) : t(tab.label)}
            </div>
            <Iconify
              icon="ion:close-outline"
              size={18}
              className="cursor-pointer opacity-50"
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.key);
              }}
              style={{
                visibility:
                  (tab.key !== activeTabRoutePath && tab.key !== hoveringTabKey) ||
                  tabs.length === 1
                    ? 'hidden'
                    : 'visible',
              }}
            />
          </div>
        </Dropdown>
      );
    },
    [
      t,
      menuItems,
      activeTabRoutePath,
      hoveringTabKey,
      tabs.length,
      menuClick,
      closeTab,
      calcTabStyle,
      SpecialTabRenderMap,
    ],
  );

  /**
   * 所有tab
   */

  const tabItems = useMemo(() => {
    return tabs?.map((tab) => ({
      label: renderTabLabel(tab),
      key: tab.key,
      closable: tabs.length > 1, // 保留一个
      children: (
        <div ref={tabContentRef} key={tab.timeStamp}>
          {tab.children}
        </div>
      ),
    }));
  }, [tabs, renderTabLabel]);

  /**
   * 拖拽结束事件
   */
  const onDragEnd: OnDragEndResponder = ({ destination, source }) => {
    // 拖拽到非法非 droppable区域
    if (!destination) {
      return;
    }
    // 原地放下
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const newTabs = Array.from(tabs);
    const [movedTab] = newTabs.splice(source.index, 1);
    newTabs.splice(destination.index, 0, movedTab);
    setTabs(newTabs);
  };

  /**
   * 渲染 tabbar
   */
  const { themeLayout } = useSettings();
  const { colorBorder, colorBgElevated } = useThemeToken();
  const { screenMap } = useResponsive();

  const multiTabsStyle: CSSProperties = {
    position: 'fixed',
    top: offsetTop ? OFFSET_HEADER_HEIGHT - 2 : HEADER_HEIGHT,
    left: 0,
    height: MULTI_TABS_HEIGHT,
    backgroundColor: Color(colorBgElevated).alpha(1).toString(),
    borderBottom: `1px dashed ${Color(colorBorder).alpha(0.6).toString()}`,
    transition: 'top 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  };

  if (themeLayout === ThemeLayout.Horizontal) {
    multiTabsStyle.top = HEADER_HEIGHT + NAV_HORIZONTAL_HEIGHT - 2;
  } else if (screenMap.md) {
    multiTabsStyle.right = '0px';
    multiTabsStyle.left = 'auto';
    multiTabsStyle.width = `calc(100% - ${
      themeLayout === ThemeLayout.Vertical ? NAV_WIDTH : NAV_COLLAPSED_WIDTH
    }px`;
  } else {
    multiTabsStyle.width = '100vw';
  }

  const handleTabClick = ({ key, params = {} }: KeepAliveTab) => {
    const tabKey = replaceDynamicParams(key, params);
    push(tabKey);
  };

  const renderTabBar: TabsProps['renderTabBar'] = () => {
    return (
      <div style={multiTabsStyle} className="z-20 w-full">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tabsDroppable" direction="horizontal">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="flex w-full">
                <div ref={scrollContainer} className="hide-scrollbar flex w-full px-2">
                  {tabs.map((tab, index) => (
                    <div
                      id={`tab-${index}`}
                      className="flex-shrink-0"
                      key={tab.key}
                      onClick={() => handleTabClick(tab)}
                    >
                      <Draggable key={tab.key} draggableId={tab.key} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="w-auto"
                          >
                            {renderTabLabel(tab)}
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
  };

  /**
   * 路由变化时，滚动到指定tab
   */
  useEffect(() => {
    if (!scrollContainer || !scrollContainer.current) {
      return;
    }
    const index = tabs.findIndex((tab) => tab.key === activeTabRoutePath);
    const currentTabElement = scrollContainer.current.querySelector(`#tab-${index}`);
    if (currentTabElement) {
      currentTabElement.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [activeTabRoutePath, tabs]);

  /**
   * scrollContainer 监听wheel事件
   */
  useEffect(() => {
    function handleMouseWheel(event: WheelEvent) {
      event.preventDefault();
      scrollContainer.current!.scrollLeft += event.deltaY;
    }

    scrollContainer.current!.addEventListener('mouseenter', () => {
      scrollContainer.current!.addEventListener('wheel', handleMouseWheel);
    });
    scrollContainer.current!.addEventListener('mouseleave', () => {
      scrollContainer.current!.removeEventListener('wheel', handleMouseWheel);
    });
  }, []);

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

  /* 隐藏滚动条 */
  .hide-scrollbar {
    overflow: scroll;
    flex-shrink: 0;
    scrollbar-width: none; /* 隐藏滚动条 Firefox */
    -ms-overflow-style: none; /* 隐藏滚动条 IE/Edge */
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none; /* 隐藏滚动条 Chrome/Safari/Opera */
  }
`;
