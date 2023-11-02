import { Dropdown, Tabs } from 'antd';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Iconify } from '@/components/icon';
import useKeepAlive, { KeepAliveTab } from '@/hooks/web/use-keepalive';
import { useRouter } from '@/router/hooks';

import { MultiTabOperation } from '#/enum';

export default function MultiTabs() {
  const { t } = useTranslation();
  const { push } = useRouter();
  const [hoveringTabKey, setHoveringTabKey] = useState('');

  console.log('hoveringTabKey', hoveringTabKey);
  const {
    tabs,
    activeTabRoutePath,
    closeTab,
    refreshTab,
    closeOthersTab,
    closeAll,
    closeLeft,
    closeRight,
  } = useKeepAlive();

  const menuItems = useMemo<MenuItemType[]>(
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
      },
      {
        label: t(`sys.tab.${MultiTabOperation.CLOSERIGHT}`),
        key: MultiTabOperation.CLOSERIGHT,
        icon: <Iconify icon="material-symbols:tab-close-right-outline" size={18} />,
      },
      {
        label: t(`sys.tab.${MultiTabOperation.CLOSEOTHERS}`),
        key: MultiTabOperation.CLOSEOTHERS,
        icon: <Iconify icon="material-symbols:tab-close-outline" size={18} />,
      },
      {
        label: t(`sys.tab.${MultiTabOperation.CLOSEALL}`),
        key: MultiTabOperation.CLOSEALL,
        icon: <Iconify icon="mdi:collapse-all-outline" size={18} />,
      },
    ],
    [t],
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

  const renderTabLabel = useCallback(
    (tab: KeepAliveTab) => {
      return (
        <Dropdown
          trigger={['contextMenu']}
          menu={{ items: menuItems, onClick: (menuInfo) => menuClick(menuInfo, tab) }}
        >
          <div
            className="flex select-none items-center"
            onMouseEnter={() => {
              if (tab.key === activeTabRoutePath) return;
              setHoveringTabKey(tab.key);
            }}
            onMouseLeave={() => setHoveringTabKey('')}
          >
            <div>{t(tab.label)}</div>
            {/* {tab.key === activeTabRoutePath || tab.key === hoveringTabKey ? ( */}
            <Iconify
              icon="ion:close-outline"
              size={20}
              className="ml-1 opacity-50"
              onClick={() => closeTab(tab.key)}
              style={{
                visibility:
                  tab.key !== activeTabRoutePath && tab.key !== hoveringTabKey
                    ? 'hidden'
                    : 'visible',
              }}
            />
          </div>
        </Dropdown>
      );
    },
    [menuItems, t, activeTabRoutePath, hoveringTabKey, menuClick, closeTab],
  );

  const tabItems = useMemo(() => {
    return tabs?.map((tab) => ({
      label: renderTabLabel(tab),
      key: tab.key,
      closable: tabs.length > 1, // 保留一个
      children: <div key={tab.timeStamp}>{tab.children}</div>,
    }));
  }, [tabs, renderTabLabel]);

  return (
    <StyledMultiTabs>
      <Tabs
        type="card"
        size="small"
        activeKey={activeTabRoutePath}
        items={tabItems}
        onChange={(activeKey) => push(activeKey)}
      />
    </StyledMultiTabs>
  );
}

const StyledMultiTabs = styled.div`
  .ant-tabs-nav {
    &::before {
      border-bottom: 0px;
    }
  }
`;
