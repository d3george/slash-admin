import { Tabs, TabsProps } from 'antd';

import BackgroundView from './views/background';
import DialogView from './views/dialog';
import Inview from './views/inview';
import OtherView from './views/other';
import ScrollView from './views/scrollview';

export default function Animate() {
  const TABS: TabsProps['items'] = [
    { key: 'inview', label: 'In View', children: <Inview /> },
    { key: 'scroll', label: 'Scroll', children: <ScrollView /> },
    { key: 'dialog', label: 'Dialog', children: <DialogView /> },
    { key: 'background', label: 'Background', children: <BackgroundView /> },
    { key: 'other', label: 'Other', children: <OtherView /> },
  ];

  return <Tabs items={TABS} />;
}
