import { Card, Row, Col, Input, Tooltip, Typography } from 'antd';
import { ChangeEvent, useState } from 'react';

import { IconButton, Iconify } from '@/components/icon';
import { useCopyToClipboard } from '@/hooks/event/use-copy-to-clipboard';

export default function ClipboardPage() {
  const { copyFn } = useCopyToClipboard();

  const [value, setValue] = useState('https://www.npmjs.com/package/');

  const textOnClick = `Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
  Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat
  dolor lectus quis orci. Cras non dolor. Praesent egestas neque eu enim. Ut varius
  tincidunt libero. Fusce fermentum odio nec arcu. Etiam rhoncus. Nulla sit amet est.
  Donec posuere vulputate arcu. Vestibulum ullamcorper mauris at ligula. Praesent ut
  ligula non mi varius sagittis. Pellentesque posuere. Praesent adipiscing. Sed
  libero. Duis leo. Nulla porta dolor.`;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  const CopyButton = (
    <Tooltip title="Copy">
      <IconButton className="text-gray" onClick={() => copyFn(value)}>
        <Iconify icon="eva:copy-fill" size={20} />
      </IconButton>
    </Tooltip>
  );
  return (
    <Card>
      <Row gutter={12}>
        <Col span={12}>
          <Typography.Title level={5}>ON CHANGE</Typography.Title>
          <Input suffix={CopyButton} value={value} onChange={handleChange} />
        </Col>
        <Col span={12}>
          <Typography.Title level={5}>ON DOUBLE CLICK</Typography.Title>
          <Typography onDoubleClick={() => copyFn(textOnClick)}>{textOnClick}</Typography>
        </Col>
      </Row>
    </Card>
  );
}
