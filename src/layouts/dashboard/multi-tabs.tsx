import { Dropdown, MenuProps, Tabs, TabsProps } from 'antd';
import { CSSProperties, useCallback, useMemo, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable, OnDragEndResponder } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Iconify } from '@/components/icon';
import Scrollbar from '@/components/scrollbar';
import useKeepAlive, { KeepAliveTab } from '@/hooks/web/use-keepalive';
import { useRouter } from '@/router/hooks';
import { useThemeToken } from '@/theme/hooks';

import { MultiTabOperation } from '#/enum';

export default function MultiTabs() {
  const { t } = useTranslation();
  const { push } = useRouter();
  const scrollBarRef = useRef<any>();
  const [hoveringTabKey, setHoveringTabKey] = useState('');
  const [openDropdownTabKey, setopenDropdownTabKey] = useState('');
  const themeToken = useThemeToken();

  const {
    tabs,
    setTabs,
    activeTabRoutePath,
    closeTab,
    refreshTab,
    closeOthersTab,
    closeAll,
    closeLeft,
    closeRight,
  } = useKeepAlive();

  const menuItems = useMemo<MenuProps['items']>(
    () => [
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
        default:
          break;
      }
    },
    [refreshTab, closeTab, closeOthersTab, closeAll, closeLeft, closeRight],
  );

  const onOpenChange = (open: boolean, tab: KeepAliveTab) => {
    if (open) {
      setopenDropdownTabKey(tab.key);
    } else {
      setopenDropdownTabKey('');
    }
  };

  const calcTabStyle: (tab: KeepAliveTab) => CSSProperties = useCallback(
    (tab) => {
      const isActive = tab.key === activeTabRoutePath || tab.key === hoveringTabKey;
      const result: CSSProperties = {
        borderRadius: '8px 8px 0 0',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: themeToken.colorBorderSecondary,
        backgroundColor: themeToken.colorBgLayout,
      };

      if (isActive) {
        result.backgroundColor = themeToken.colorBgContainer;
        result.color = themeToken.colorPrimaryText;
      }
      return result;
    },
    [activeTabRoutePath, hoveringTabKey, themeToken],
  );
  const renderTabLabel = useCallback(
    (tab: KeepAliveTab) => {
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
            <div>{t(tab.label)}</div>
            <Iconify
              icon="ion:close-outline"
              size={20}
              className="opacity-50"
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
      menuItems,
      calcTabStyle,
      t,
      activeTabRoutePath,
      hoveringTabKey,
      tabs.length,
      menuClick,
      closeTab,
    ],
  );

  const tabItems = useMemo(() => {
    return tabs?.map((tab) => ({
      label: renderTabLabel(tab),
      key: tab.key,
      closable: tabs.length > 1, // 保留一个
      children: <div key={tab.timeStamp}>{tab.children}</div>,
    }));
  }, [tabs, renderTabLabel]);

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

  const renderTabBar: TabsProps['renderTabBar'] = () => {
    return (
      <Scrollbar ref={scrollBarRef} className="w-full">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tabsDroppable" direction="horizontal">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="flex">
                {tabs.map((tab, index) => (
                  <div className="flex-shrink-0">
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
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Scrollbar>
    );
  };

  return (
    <StyledMultiTabs>
      <Tabs
        size="small"
        type="card"
        tabBarGutter={4}
        activeKey={activeTabRoutePath}
        items={tabItems}
        renderTabBar={renderTabBar}
        onChange={(activeKey) => push(activeKey)}
      />
    </StyledMultiTabs>
  );
}

const StyledMultiTabs = styled.div`
  height: 100%;
  .anticon {
    margin: 0px !important;
  }
  .simplebar-track {
    display: none;
  }
`;
