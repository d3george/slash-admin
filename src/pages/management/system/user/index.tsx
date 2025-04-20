import { USER_LIST } from "@/_mock/assets";
import { Icon } from "@/components/icon";
import { usePathname, useRouter } from "@/router/hooks";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { Popconfirm, Tag } from "antd";
import Table, { type ColumnsType } from "antd/es/table";
import type { Role, UserInfo } from "#/entity";
import { BasicStatus } from "#/enum";

const USERS: UserInfo[] = USER_LIST as UserInfo[];

export default function RolePage() {
	const { push } = useRouter();
	const pathname = usePathname();

	const columns: ColumnsType<UserInfo> = [
		{
			title: "Name",
			dataIndex: "name",
			width: 300,
			render: (_, record) => {
				return (
					<div className="flex">
						<img alt="" src={record.avatar} className="h-10 w-10 rounded-full" />
						<div className="ml-2 flex flex-col">
							<span className="text-sm">{record.username}</span>
							<span className="text-xs text-text-secondary">{record.email}</span>
						</div>
					</div>
				);
			},
		},
		{
			title: "Role",
			dataIndex: "role",
			align: "center",
			width: 120,
			render: (role: Role) => <Tag color="cyan">{role.name}</Tag>,
		},
		{
			title: "Status",
			dataIndex: "status",
			align: "center",
			width: 120,
			render: (status) => (
				<Tag color={status === BasicStatus.DISABLE ? "error" : "success"}>
					{status === BasicStatus.DISABLE ? "Disable" : "Enable"}
				</Tag>
			),
		},
		{
			title: "Action",
			key: "operation",
			align: "center",
			width: 100,
			render: (_, record) => (
				<div className="flex w-full justify-center text-gray-500">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => {
							push(`${pathname}/${record.id}`);
						}}
					>
						<Icon icon="mdi:card-account-details" size={18} />
					</Button>
					<Button variant="ghost" size="icon" onClick={() => {}}>
						<Icon icon="solar:pen-bold-duotone" size={18} />
					</Button>
					<Popconfirm title="Delete the User" okText="Yes" cancelText="No" placement="left">
						<Button variant="ghost" size="icon">
							<Icon icon="mingcute:delete-2-fill" size={18} className="text-error!" />
						</Button>
					</Popconfirm>
				</div>
			),
		},
	];

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>User List</div>
					<Button onClick={() => {}}>New</Button>
				</div>
			</CardHeader>
			<CardContent>
				<Table
					rowKey="id"
					size="small"
					scroll={{ x: "max-content" }}
					pagination={false}
					columns={columns}
					dataSource={USERS}
				/>
			</CardContent>
		</Card>
	);
}
