import { Popconfirm } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { isNil } from 'ramda';
import { useTranslation } from 'react-i18next';

import { IconButton, Iconify, SvgIcon } from '@/components/icon';
import { useUserPermission } from '@/store/userStore';
import ProTag from '@/theme/antd/components/tag';

import { Permission } from '#/entity';
import { BasicStatus, PermissionType } from '#/enum';

export default function PermissionPage() {
  const permissions = useUserPermission();
  const { t } = useTranslation();
  const columns: ColumnsType<Permission> = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 300,
      render: (_, record) => <div>{t(record.label)}</div>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      width: 60,
      render: (_, record) => <ProTag color="processing">{PermissionType[record.type]}</ProTag>,
    },
    {
      title: 'Icon',
      dataIndex: 'icon',
      width: 60,
      render: (icon) => {
        if (isNil(icon)) return '';
        if (icon.startsWith('ic')) {
          return <SvgIcon icon={icon} size={18} className="ant-menu-item-icon" />;
        }
        return <Iconify icon={icon} size={18} className="ant-menu-item-icon" />;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      width: 120,
      render: (status) => (
        <ProTag color={status === BasicStatus.DISABLE ? 'error' : 'success'}>
          {status === BasicStatus.DISABLE ? 'Disable' : 'Enable'}
        </ProTag>
      ),
    },
    { title: 'Order', dataIndex: 'order', width: 60 },
    {
      title: 'Action',
      key: 'operation',
      align: 'center',
      width: 100,
      render: (_) => (
        <div className="flex w-full justify-center text-gray">
          <IconButton onClick={() => {}}>
            <Iconify icon="solar:pen-bold-duotone" size={18} />
          </IconButton>
          <Popconfirm title="Delete the Permission" okText="Yes" cancelText="No" placement="left">
            <IconButton>
              <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
            </IconButton>
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <Table
      rowKey="id"
      size="small"
      scroll={{ x: 'max-content' }}
      pagination={false}
      columns={columns}
      dataSource={permissions}
    />
  );
}
