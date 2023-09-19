import { Card } from 'antd';
import { useState } from 'react';

import Editor from '@/components/editor';

export default function EditorPage() {
  const [quillSimple, setQuillSimple] = useState('');
  const [quillFull, setQuillFull] = useState('');

  return (
    <>
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
