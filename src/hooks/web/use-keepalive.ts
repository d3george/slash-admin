import { isEmpty } from 'ramda';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useCurrentRouteMeta, useRouter } from '@/router/hooks';
import { replaceDynamicParams } from '@/router/hooks/use-current-route-meta';

import type { RouteMeta } from '#/router';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

export type KeepAliveTab = RouteMeta & {
  children: any;
};
export default function useKeepAlive() {
  console.log('useKeepAlive');
  const { push } = useRouter();

  // current route meta
  const currentRouteMeta = useCurrentRouteMeta();

  // tabs
  const [tabs, setTabs] = useState<KeepAliveTab[]>([]);

  // active tab
  const activeTabRoutePath = useMemo(() => {
    if (!currentRouteMeta) return '';

    const { key, params = {} } = currentRouteMeta;
    if (!isEmpty(params)) {
      return replaceDynamicParams(key, params);
    }
    return key;
  }, [currentRouteMeta]);

  /**
   * Close specified tab
   */
  const closeTab = useCallback(
    (path = activeTabRoutePath) => {
      const tempTabs = [...tabs];
      if (tempTabs.length === 1) return;

      const deleteTabIndex = tempTabs.findIndex((item) => item.key === path);
      if (deleteTabIndex === -1) return;

      if (deleteTabIndex > 0) {
        push(tempTabs[deleteTabIndex - 1].key);
      } else {
        push(tempTabs[deleteTabIndex + 1].key);
      }

      tempTabs.splice(deleteTabIndex, 1);
      setTabs(tempTabs);
    },
    [activeTabRoutePath, push, tabs],
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
    const { outlet: children } = currentRouteMeta;

    const isExisted = tabs.find((item) => item.key === activeTabRoutePath);

    if (!isExisted) {
      setTabs((prev) => [
        ...prev,
        { ...currentRouteMeta, key: activeTabRoutePath, children, timeStamp: getTimeStamp() },
      ]);
    }
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
