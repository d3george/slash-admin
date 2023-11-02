import { useCallback, useEffect, useState } from 'react';

import { useMatchRouteMeta, useRouter } from '@/router/hooks';

import { RouteMeta } from '#/router';

export type KeepAliveTab = RouteMeta & {
  children: any;
};
export default function useKeepAlive() {
  const { push } = useRouter();
  // tabs
  const [tabs, setTabs] = useState<KeepAliveTab[]>([]);

  // active tab
  const [activeTabRoutePath, setActiveTabRoutePath] = useState<string>();

  // current route meta
  const currentRouteMeta = useMatchRouteMeta();

  /**
   * Close specified tab
   */
  const closeTab = useCallback(
    (path = activeTabRoutePath) => {
      if (tabs.length === 1) return;
      const deleteTabIndex = tabs.findIndex((item) => item.key === path);
      if (tabs[deleteTabIndex].key === activeTabRoutePath) {
        if (deleteTabIndex > 0) {
          push(tabs[deleteTabIndex - 1].key);
        } else {
          push(tabs[deleteTabIndex + 1].key);
        }
      }

      const newTabs = Array.from(tabs);
      newTabs.splice(deleteTabIndex, 1);
      setTabs([...newTabs]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeTabRoutePath],
  );

  /**
   * Close other tabs besides the specified tab
   */
  const closeOthersTab = useCallback(
    (path = activeTabRoutePath) => {
      setTabs((prev) => prev.filter((item) => item.key === path));
    },
    [activeTabRoutePath],
  );

  /**
   * Close all tabs then navigate to the home page
   */
  const closeAll = useCallback(() => {
    // setTabs([tabHomePage]);
    setTabs([]);
    push('/dashboard/workbench');
  }, [push]);

  /**
   * Close all tabs in the left of specified tab
   */
  const closeLeft = useCallback(
    (path: string) => {
      const currentTabIndex = tabs.findIndex((item) => item.key === path);
      const newTabs = Array.from(tabs);
      newTabs.splice(0, currentTabIndex);
      setTabs(newTabs);
    },
    [tabs],
  );

  /**
   * Close all tabs in the right of specified tab
   */
  const closeRight = useCallback(
    (path: string) => {
      const currentTabIndex = tabs.findIndex((item) => item.key === path);
      const newTabs = Array.from(tabs);
      newTabs.splice(currentTabIndex + 1, -1);
      setTabs(newTabs);
    },
    [tabs],
  );

  /**
   * Refresh specified tab
   */
  const refreshTab = useCallback(
    (path = activeTabRoutePath) => {
      setTabs((prev) => {
        const index = prev.findIndex((item) => item.key === path);

        if (index >= 0) {
          prev[index].timeStamp = getKey();
        }

        return [...prev];
      });
    },
    [activeTabRoutePath],
  );

  useEffect(() => {
    if (currentRouteMeta) {
      const existed = tabs.find((item) => item.key === currentRouteMeta.key);

      if (!existed) {
        setTabs((prev) => [
          ...prev,
          { ...currentRouteMeta, children: currentRouteMeta.outlet, timeStamp: getKey() },
        ]);
      }

      setActiveTabRoutePath(currentRouteMeta.key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRouteMeta]);

  return {
    tabs,
    activeTabRoutePath,
    closeTab,
    closeOthersTab,
    refreshTab,
    closeAll,
    closeLeft,
    closeRight,
  };
}

function getKey() {
  return new Date().getTime().toString();
}
