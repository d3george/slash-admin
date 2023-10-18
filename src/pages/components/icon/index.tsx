import { Card, Space, Typography } from 'antd';

import { Iconify, SvgIcon } from '@/components/icon';
import { useThemeToken } from '@/theme/hooks';

export default function IconPage() {
  const { colorPrimary, colorInfo, colorSuccess, colorWarning, colorError } = useThemeToken();
  return (
    <Space direction="vertical" style={{ display: 'flex' }}>
      <Card title="Antd Icons">
        <Typography.Link
          href="https://ant.design/components/icon-cn"
          style={{ color: colorPrimary }}
        >
          https://ant.design/components/icon-cn
        </Typography.Link>
      </Card>
      <Card title="Iconify Icons">
        <Typography.Link
          href="https://ant.design/components/icon-cn"
          style={{ color: colorPrimary }}
          className="mb-4 block"
        >
          https://iconify.design/
        </Typography.Link>
        <Iconify icon="solar:emoji-funny-square-bold-duotone" size={24} color={colorPrimary} />
        <Iconify icon="solar:emoji-funny-square-bold-duotone" size={24} color={colorInfo} />
        <Iconify icon="solar:emoji-funny-square-bold-duotone" size={24} color={colorSuccess} />
        <Iconify icon="solar:emoji-funny-square-bold-duotone" size={24} color={colorWarning} />
        <Iconify icon="solar:emoji-funny-square-bold-duotone" size={24} color={colorError} />
      </Card>
      <Card title="Svg Icons">
        <Typography.Text style={{ color: colorPrimary }} className="mb-4 block">
          使用svg 雪碧图
        </Typography.Text>
        <SvgIcon icon="ic-workbench" size={24} color={colorPrimary} />
        <SvgIcon icon="ic-workbench" size={24} color={colorInfo} />
        <SvgIcon icon="ic-workbench" size={24} color={colorSuccess} />
        <SvgIcon icon="ic-workbench" size={24} color={colorWarning} />
        <SvgIcon icon="ic-workbench" size={24} color={colorError} />
      </Card>
    </Space>
  );
}
