import { Tabs, TabsProps } from 'antd';

import BackgroundView from './views/background';
import Inview from './views/inview';
import ScrollView from './views/scroll';

export default function Animate() {
  const TABS: TabsProps['items'] = [
    { key: 'inview', label: 'In View', children: <Inview /> },
    { key: 'scroll', label: 'Scroll', children: <ScrollView /> },
    { key: 'background', label: 'Background', children: <BackgroundView /> },
  ];

  return <Tabs items={TABS} />;
}
