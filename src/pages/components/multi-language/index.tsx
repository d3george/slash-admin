import { Card, Pagination, Radio, Space, Typography } from 'antd';

import { SvgIcon } from '@/components/icon';
import useLocale from '@/locales/useLocale';
import { useThemeToken } from '@/theme/hooks';

import { LocalEnum } from '#/enum';

export default function MultiLanguagePage() {
  const {
    setLocale,
    locale,
    language: { icon, label },
  } = useLocale();

  const { colorPrimary } = useThemeToken();

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Typography.Link href="https://www.i18next.com/" style={{ color: colorPrimary }}>
        https://www.i18next.com
      </Typography.Link>
      <Typography.Link href="https://ant.design/docs/react/i18n-cn" style={{ color: colorPrimary }}>
        https://ant.design/docs/react/i18n-cn
      </Typography.Link>
      <Card title="Flexible">
        <Radio.Group onChange={(e) => setLocale(e.target.value)} value={locale}>
          <Radio value={LocalEnum.en_US}>English</Radio>
          <Radio value={LocalEnum.zh_CN}>Chinese</Radio>
        </Radio.Group>

        <div className="flex items-center text-4xl">
          <SvgIcon icon={icon} className="mr-4 rounded-md" size="30" />
          {label}
        </div>
      </Card>

      <Card title="System">
        <Pagination defaultCurrent={1} total={50} showSizeChanger showQuickJumper />
      </Card>
    </Space>
  );
}
