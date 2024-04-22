import { isEmpty } from 'ramda';
import { useCallback, useEffect, useState } from 'react';

import { useMatchRouteMeta, useRouter } from '@/router/hooks';
import { replaceDynamicParams } from '@/router/hooks/use-match-route-meta';

import type { RouteMeta } from '#/router';

export type KeepAliveTab = RouteMeta & {
  children: any;
};
export default function useKeepAlive() {
  const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;
  const { push } = useRouter();

  // tabs
  const [tabs, setTabs] = useState<KeepAliveTab[]>([]);

  // active tab
  const [activeTabRoutePath, setActiveTabRoutePath] = useState<string>('');

  // current route meta
  const currentRouteMeta = useMatchRouteMeta();

  /**
   * Close specified tab
   */
  const closeTab = useCallback(
    (path = activeTabRoutePath) => {
      const tempTabs = [...tabs];
      if (tempTabs.length === 1) return;
      const deleteTabIndex = tempTabs.findIndex((item) => item.key === path);
      if (deleteTabIndex > 0) {
        push(tempTabs[deleteTabIndex - 1].key);
      } else {
        push(tempTabs[deleteTabIndex + 1].key);
      }

      tempTabs.splice(deleteTabIndex, 1);
      setTabs(tempTabs);
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
      if (path !== activeTabRoutePath) {
        push(path);
      }
    },
    [activeTabRoutePath, push],
  );

  /**
   * Close all tabs then navigate to the home page
   */
  const closeAll = useCallback(() => {
    setTabs([]);
    push(HOMEPAGE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [push]);

  /**
   * Close all tabs in the left of specified tab
   */
  const closeLeft = useCallback(
    (path: string) => {
      const currentTabIndex = tabs.findIndex((item) => item.key === path);
      const newTabs = tabs.slice(currentTabIndex);
      setTabs(newTabs);
      push(path);
    },
    [push, tabs],
  );

  /**
   * Close all tabs in the right of specified tab
   */
  const closeRight = useCallback(
    (path: string) => {
      const currentTabIndex = tabs.findIndex((item) => item.key === path);
      const newTabs = tabs.slice(0, currentTabIndex + 1);
      setTabs(newTabs);
      push(path);
    },
    [push, tabs],
  );

  /**
   * Refresh specified tab
   */
  const refreshTab = useCallback(
    (path = activeTabRoutePath) => {
      setTabs((prev) => {
        const index = prev.findIndex((item) => item.key === path);

        if (index >= 0) {
          prev[index].timeStamp = getTimeStamp();
        }

        return [...prev];
      });
    },
    [activeTabRoutePath],
  );

  useEffect(() => {
    setTabs((prev) => prev.filter((item) => !item.hideTab));

    if (!currentRouteMeta) return;
    let { key } = currentRouteMeta;
    const { outlet: children, params = {} } = currentRouteMeta;

    if (!isEmpty(params)) {
      key = replaceDynamicParams(key, params);
    }
    const existed = tabs.find((item) => item.key === key);

    if (!existed) {
      setTabs((prev) => [
        ...prev,
        { ...currentRouteMeta, key, children, timeStamp: getTimeStamp() },
      ]);
    }

    setActiveTabRoutePath(key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRouteMeta]);

  return {
    tabs,
    activeTabRoutePath,
    setTabs,
    closeTab,
    closeOthersTab,
    refreshTab,
    closeAll,
    closeLeft,
    closeRight,
  };
}

function getTimeStamp() {
  return new Date().getTime().toString();
}
