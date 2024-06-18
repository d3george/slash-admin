import { Card, Col, Row, Space, Switch, Tabs, TabsProps, Typography } from 'antd';
import { useState } from 'react';

import { Iconify } from '@/components/icon';
import { Upload, UploadAvatar, UploadBox } from '@/components/upload';

export default function UploadPage() {
  const [thumbnail, setThumbnail] = useState<boolean>(false);

  const onChange = (checked: boolean) => {
    setThumbnail(checked);
  };

  const ThumbnailSwitch = <Switch size="small" checked={thumbnail} onChange={onChange} />;

  const boxPlaceHolder = (
    <div className="flex flex-col">
      <Iconify icon="eva:cloud-upload-fill" size={40} />
      <Typography.Text type="secondary" className="">
        Upload File
      </Typography.Text>
    </div>
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
      styles={{
        body: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <UploadAvatar />
    </Card>
  );
  const UploadBoxTab = (
    <Row gutter={[16, 16]}>
      <Col span={24} md={4}>
        <UploadBox />
      </Col>
      <Col span={24} md={20}>
        <UploadBox placeholder={boxPlaceHolder} />
      </Col>
    </Row>
  );

  const TABS: TabsProps['items'] = [
    { key: 'upload--file', label: 'Upload Single File', children: UploadFileTab },
    { key: 'upload-avatar', label: 'Upload Avatar', children: UploadAvatarTab },
    { key: 'upload-box', label: 'Upload Box', children: UploadBoxTab },
  ];

  return <Tabs items={TABS} />;
}
