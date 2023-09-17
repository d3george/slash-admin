import { Card } from 'antd';
import { useScroll } from 'framer-motion';
import { useRef } from 'react';

import ScrollProgress from '@/components/scroll-progress';

const TEXT = `Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Quisque ut nisi.
 Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Vestibulum eu odio.
  Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Cras ultricies mi eu turpis hendrerit fringilla. 
  Phasellus consectetuer vestibulum elit. Phasellus magna. Nullam tincidunt adipiscing enim. 
  Vestibulum volutpat pretium libero. Nullam quis ante. Morbi mollis tellus ac sapien.
   Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. 
   Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
   Fusce ac felis sit amet ligula pharetra condimentum. Morbi mattis ullamcorper velit. 
   Vivamus consectetuer hendrerit lacus. Nullam quis ante. Praesent turpis. 
   Praesent porttitor, nulla vitae posuere iaculis, arcu nisl dignissim dolor, a pretium mi sem ut ipsum. 
   Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Quisque ut nisi. 
   Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Vestibulum eu odio. 
   Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Cras ultricies mi eu turpis hendrerit fringilla. 
   Phasellus consectetuer vestibulum elit. Phasellus magna. Nullam tincidunt adipiscing enim. Vestibulum volutpat pretium libero. 
   Nullam quis ante. Morbi mollis tellus ac sapien. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. 
   Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
   Fusce ac felis sit amet ligula pharetra condimentum. Morbi mattis ullamcorper velit. 
   Vivamus consectetuer hendrerit lacus. Nullam quis ante. Praesent turpis. 
   Praesent porttitor, nulla vitae posuere iaculis, arcu nisl dignissim dolor, a pretium mi sem ut ipsum.`;
export default function ScrollProgressView() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const containerScroll = useScroll({ container: containerRef });

  return (
    <Card title="ScrollProgress">
      <ScrollProgress scrollYProgress={containerScroll.scrollYProgress} />
      <div ref={containerRef} className="h-80 overflow-auto">
        {[...Array(4)].map((_, index) => (
          <div key={index}>{TEXT}</div>
        ))}
      </div>
    </Card>
  );
}
