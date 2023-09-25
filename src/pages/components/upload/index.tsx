import { Card, Switch } from 'antd';
import { useState } from 'react';

import Upload from '@/components/upload';

export default function UploadPage() {
  const [thumbnail, setThumbnail] = useState(false);
  const onChange = (checked: boolean) => {
    setThumbnail(checked);
  };
  const ThumbnailSwitch = <Switch size="small" checked={thumbnail} onChange={onChange} />;

  return (
    <>
      <Card title="Upload Multi File" extra={ThumbnailSwitch}>
        <Upload thumbnail={thumbnail} name="multi" />
      </Card>
      <Card title="Upload Single File" extra={ThumbnailSwitch}>
        <Upload thumbnail={thumbnail} maxCount={1} name="single" />
      </Card>
    </>
  );
}
