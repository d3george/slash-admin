import { TabsProps, Tabs } from 'antd';

import ScrollbarView from './views/scroll-bar';
import ScrollProgressView from './views/scroll-progress';

export default function ScrollPage() {
  const TABS: TabsProps['items'] = [
    { key: 'scrollbar', label: 'Scrollbar', children: <ScrollbarView /> },
    { key: 'scroll-progress', label: 'ScrollProgress', children: <ScrollProgressView /> },
  ];

  return <Tabs items={TABS} />;
}
