import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Space } from 'antd';
import { useMemo, useState } from 'react';

import { Iconify } from '@/components/icon';

export default function CalendarHeader() {
  const items = useMemo(
    () => [
      {
        key: '1',
        label: 'Month',
        icon: <Iconify icon="mdi:calendar-month-outline" size={18} />,
      },
      {
        key: '2',
        label: 'Week',
        icon: <Iconify icon="mdi:calendar-weekend-outline" size={18} />,
      },
      {
        key: '3',
        label: 'Day',
        icon: <Iconify icon="mdi:calendar-today-outline" size={18} />,
      },
      {
        key: '4',
        label: 'Agenda',
        icon: <Iconify icon="mdi:view-agenda-outline" size={18} />,
      },
    ],
    [],
  );

  const [viewType, setViewType] = useState(items[1]);
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const selectedViewType = items.find((item) => item.key === e.key)!;
    setViewType(selectedViewType);
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className="relative flex items-center justify-between py-5">
      <Dropdown menu={menuProps}>
        <Button type="text" size="small">
          <Space align="center">
            {viewType.icon}
            {viewType.label}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>

      <Space className="flex-grow-0">
        <Iconify icon="solar:alt-arrow-left-outline" size={16} />
        today
        <Iconify icon="solar:alt-arrow-right-outline" size={16} />
      </Space>

      <Button type="primary" size="small">
        Today
      </Button>
    </div>
  );
}
