import { isEmpty } from 'ramda';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useCurrentRouteMeta, useRouter } from '@/router/hooks';
import { replaceDynamicParams } from '@/router/hooks/use-current-route-meta';

import type { RouteMeta } from '#/router';

export type KeepAliveTab = RouteMeta & {
  children: any;
};
type MultiTabsContextType = {
  tabs: KeepAliveTab[];
  activeTabRoutePath?: string;
  setTabs: (tabs: KeepAliveTab[]) => void;
  closeTab: (path?: string) => void;
  closeOthersTab: (path?: string) => void;
  closeAll: () => void;
  closeLeft: (path: string) => void;
  closeRight: (path: string) => void;
  refreshTab: (path: string) => void;
};
const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

const MultiTabsContext = createContext<MultiTabsContextType>({
  tabs: [],
  activeTabRoutePath: '',
  setTabs: () => {},
  closeTab: () => {},
  closeOthersTab: () => {},
  closeAll: () => {},
  closeLeft: () => {},
  closeRight: () => {},
  refreshTab: () => {},
});

export function MultiTabsProvider({ children }: PropsWithChildren) {
  const { push } = useRouter();
  // tabs
  const [tabs, setTabs] = useState<KeepAliveTab[]>([]);

  // current route meta
  const currentRouteMeta = useCurrentRouteMeta();
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
    const isExisted = tabs.find((item) => item.key === key);

    if (!isExisted) {
      setTabs((prev) => [
        ...prev,
        { ...currentRouteMeta, key, children, timeStamp: getTimeStamp() },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRouteMeta]);

  const defaultValue: MultiTabsContextType = useMemo(
    () => ({
      tabs,
      activeTabRoutePath,
      setTabs,
      closeTab,
      closeOthersTab,
      refreshTab,
      closeAll,
      closeLeft,
      closeRight,
    }),
    [
      activeTabRoutePath,
      closeAll,
      closeLeft,
      closeOthersTab,
      closeRight,
      closeTab,
      refreshTab,
      tabs,
    ],
  );
  return <MultiTabsContext.Provider value={defaultValue}>{children}</MultiTabsContext.Provider>;
}

export function useMultiTabsContext() {
  return useContext(MultiTabsContext);
}

function getTimeStamp() {
  return new Date().getTime().toString();
}
