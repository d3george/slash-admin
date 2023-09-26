import { Card, Space, Switch, Tabs, TabsProps, Typography } from 'antd';
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

  const UploadFileTab = (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Card title="Upload Multi File" className="w-full" extra={ThumbnailSwitch}>
        <Upload thumbnail={thumbnail} name="multi" />
      </Card>
      <Card title="Upload Single File" extra={ThumbnailSwitch}>
        <Upload thumbnail={thumbnail} maxCount={1} name="single" />
      </Card>
    </Space>
  );
  const UploadAvatarTab = (
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
  );

  const TABS: TabsProps['items'] = [
    { key: 'upload--file', label: 'Upload Single File', children: UploadFileTab },
    { key: 'upload-avatar', label: 'Upload Avatar', children: UploadAvatarTab },
  ];

  return <Tabs items={TABS} />;
}
