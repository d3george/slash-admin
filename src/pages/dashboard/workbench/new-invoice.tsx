import { Space, Typography } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';

import Card from '@/components/card';
import { IconButton, Iconify } from '@/components/icon';
import Scrollbar from '@/components/scrollbar';
import ProTag from '@/theme/antd/components/tag';

interface DataType {
  key: string;
  id: string;
  category: string;
  price: string;
  status: string;
}

export default function NewInvoice() {
  const columns: ColumnsType<DataType> = [
    {
      title: 'InvoiceId',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_status) => {
        const status = _status as string;
        let color = 'success';
        if (status === 'Progress') color = 'gold';
        if (status === 'Out of Date') color = 'red';
        return <ProTag color={color}>{status}</ProTag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <IconButton>
            <Iconify icon="fontisto:more-v-a" />
          </IconButton>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      id: 'INV-1990',
      category: 'Android',
      price: '$83.74',
      status: 'Paid',
    },
    {
      key: '2',
      id: 'INV-1991',
      category: 'Mac',
      price: '$97.14',
      status: 'Out of Date',
    },
    {
      key: '3',
      id: 'INV-1992',
      category: 'Windows',
      price: '$68.71',
      status: 'Progress',
    },
    {
      key: '4',
      id: 'INV-1993',
      category: 'Android',
      price: '$85.21',
      status: 'Paid',
    },
    {
      key: '5',
      id: 'INV-1994',
      category: 'Mac',
      price: '$53.17',
      status: 'Paid',
    },
  ];

  return (
    <Card className="flex-col">
      <header className="self-start">
        <Typography.Title level={5}>New Invoice</Typography.Title>
      </header>
      <main className="w-full">
        <Scrollbar>
          <Table columns={columns} dataSource={data} />
        </Scrollbar>
      </main>
    </Card>
  );
}
