import { Row, Col } from 'antd';
import { useState } from 'react';

import Markdown from '@/components/markdown';

export default function MarkdownPage() {
  const [content, setContent] = useState('');
  return (
    <Row>
      <Col span={12}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
          className="w-full"
        />
      </Col>
      <Col span={12}>
        <Markdown>{content}</Markdown>
      </Col>
    </Row>
  );
}
