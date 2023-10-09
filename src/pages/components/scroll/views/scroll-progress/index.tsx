import { faker } from '@faker-js/faker';
import { Card, Typography } from 'antd';
import { useScroll } from 'framer-motion';
import { useRef } from 'react';

import ScrollProgress from '@/components/scroll-progress';
import { useThemeToken } from '@/theme/hooks';

const TEXT = faker.lorem.paragraphs({ min: 20, max: 30 });
export default function ScrollProgressView() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const containerScroll = useScroll({ container: containerRef });

  const { colorPrimary } = useThemeToken();
  return (
    <>
      <Typography.Link
        href="https://www.framer.com/motion/"
        style={{ color: colorPrimary }}
        className="mb-4 block"
      >
        https://www.framer.com/motion/
      </Typography.Link>
      <Card title="ScrollProgress">
        <ScrollProgress scrollYProgress={containerScroll.scrollYProgress} />
        <div ref={containerRef} className="h-80 overflow-auto">
          {[...Array(4)].map((_, index) => (
            <div key={index}>{TEXT}</div>
          ))}
        </div>
      </Card>
    </>
  );
}
