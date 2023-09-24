import { Card, Typography } from 'antd';
import { useState } from 'react';

import Editor from '@/components/editor';
import { useThemeToken } from '@/theme/hooks';

export default function EditorPage() {
  const [quillSimple, setQuillSimple] = useState('');
  const [quillFull, setQuillFull] = useState('');
  const { colorPrimary } = useThemeToken();

  return (
    <>
      <Typography.Link
        href="https://github.com/zenoamaro/react-quill"
        style={{ color: colorPrimary }}
        className="mb-4 block"
      >
        https://github.com/zenoamaro/react-quill
      </Typography.Link>
      <Card title="Editor Simple">
        <Editor id="sample-editor" sample value={quillSimple} onChange={setQuillSimple} />
      </Card>
      <div className="h-10" />
      <Card title="Editor Full">
        <Editor id="full-editor" value={quillFull} onChange={setQuillFull} />
      </Card>
    </>
  );
}
