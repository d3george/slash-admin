import { Tabs, TabsProps, Typography } from 'antd';

import { useThemeToken } from '@/theme/hooks';

import BackgroundView from './views/background';
import Inview from './views/inview';
import ScrollView from './views/scroll';

export default function AnimatePage() {
  const { colorPrimary } = useThemeToken();
  const TABS: TabsProps['items'] = [
    { key: 'inview', label: 'In View', children: <Inview /> },
    { key: 'scroll', label: 'Scroll', children: <ScrollView /> },
    { key: 'background', label: 'Background', children: <BackgroundView /> },
  ];

  return (
    <>
      <Typography.Link
        href="https://www.framer.com/motion/"
        style={{ color: colorPrimary }}
        className="mb-4 block"
      >
        https://www.framer.com/motion/
      </Typography.Link>
      <Tabs items={TABS} type="card" />
    </>
  );
}
