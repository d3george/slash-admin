import { Layout } from 'antd';
import { useScroll } from 'framer-motion';
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import { CircleLoading } from '@/components/loading';
import ProgressBar from '@/components/progress-bar';
import { useSettings } from '@/store/settingStore';
import { cn } from '@/utils';

import Header from './header';
import Main from './main';
import Nav from './nav';

import { ThemeLayout, ThemeMode } from '#/enum';

function DashboardLayout() {
  const { themeLayout, themeMode } = useSettings();

  const mainEl = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: mainEl });

  /**
   *  Tracks if content is scrolled
   */
  const [offsetTop, setOffsetTop] = useState(false);

  const onOffSetTop = useCallback(() => {
    scrollY.on('change', (scrollHeight) => {
      setOffsetTop(scrollHeight > 0);
    });
  }, [scrollY]);

  useEffect(() => {
    onOffSetTop();
  }, [onOffSetTop]);

  // Memoize layout className
  const layoutClassName = useMemo(() => {
    return cn(
      'flex h-screen overflow-hidden',
      themeLayout === ThemeLayout.Horizontal ? 'flex-col' : 'flex-row',
    );
  }, [themeLayout]);

  return (
    <ScrollbarStyleWrapper $themeMode={themeMode}>
      <ProgressBar />
      <Layout className={layoutClassName}>
        <Suspense fallback={<CircleLoading />}>
          <Layout>
            <Header offsetTop={themeLayout === ThemeLayout.Vertical ? offsetTop : undefined} />
            <Nav />
            <Main ref={mainEl} offsetTop={offsetTop} />
          </Layout>
        </Suspense>
      </Layout>
    </ScrollbarStyleWrapper>
  );
}
export default DashboardLayout;

// Move styles to a separate constant
const scrollbarStyles = {
  dark: {
    track: '#2c2c2c',
    thumb: '#6b6b6b',
    thumbHover: '#939393',
  },
  light: {
    track: '#FAFAFA',
    thumb: '#C1C1C1',
    thumbHover: '#7D7D7D',
  },
};

const ScrollbarStyleWrapper = styled.div<{ $themeMode?: ThemeMode }>`
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 8px;
    background: ${({ $themeMode }) =>
      $themeMode === ThemeMode.Dark ? scrollbarStyles.dark.track : scrollbarStyles.light.track};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${({ $themeMode }) =>
      $themeMode === ThemeMode.Dark ? scrollbarStyles.dark.thumb : scrollbarStyles.light.thumb};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ $themeMode }) =>
      $themeMode === ThemeMode.Dark
        ? scrollbarStyles.dark.thumbHover
        : scrollbarStyles.light.thumbHover};
  }

  .simplebar-scrollbar::before {
    background: ${({ $themeMode }) =>
      $themeMode === ThemeMode.Dark ? scrollbarStyles.dark.thumb : scrollbarStyles.light.thumb};
  }

  .simplebar-scrollbar.simplebar-visible:before {
    opacity: 1;
  }
`;
