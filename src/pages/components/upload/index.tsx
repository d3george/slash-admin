import { Card, Switch, Typography } from 'antd';
import { useState } from 'react';

import { Upload, UploadAvatar } from '@/components/upload';
import { fBytes } from '@/utils/format-number';

export default function UploadPage() {
  const [thumbnail, setThumbnail] = useState<boolean>(false);

  const onChange = (checked: boolean) => {
    setThumbnail(checked);
  };

  const ThumbnailSwitch = <Switch size="small" checked={thumbnail} onChange={onChange} />;

  const helpText = (
    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
      Allowed *.jpeg, *.jpg, *.png, *.gif
      <br /> max size of {fBytes(3145728)}
    </Typography.Text>
  );

  return (
    <>
      <Card title="Upload Multi File" extra={ThumbnailSwitch}>
        <Upload thumbnail={thumbnail} name="multi" />
      </Card>
      <Card title="Upload Single File" extra={ThumbnailSwitch}>
        <Upload thumbnail={thumbnail} maxCount={1} name="single" />
      </Card>
      <Card
        title="Upload Avatar"
        bodyStyle={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <UploadAvatar helperText={helpText} />
      </Card>
    </>
  );
}
