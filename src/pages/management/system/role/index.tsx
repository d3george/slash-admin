import { ROLE_LIST } from "@/_mock/assets";
import { Icon } from "@/components/icon";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { Popconfirm, Tag } from "antd";
import Table, { type ColumnsType } from "antd/es/table";
import { useState } from "react";
import type { Role } from "#/entity";
import { BasicStatus } from "#/enum";
import { RoleModal, type RoleModalProps } from "./role-modal";

const ROLES: Role[] = ROLE_LIST as Role[];

const DEFAULE_ROLE_VALUE: Role = {
	id: "",
	name: "",
	label: "",
	status: BasicStatus.ENABLE,
	permission: [],
};
export default function RolePage() {
	const [roleModalPros, setRoleModalProps] = useState<RoleModalProps>({
		formValue: { ...DEFAULE_ROLE_VALUE },
		title: "New",
		show: false,
		onOk: () => {
			setRoleModalProps((prev) => ({ ...prev, show: false }));
		},
		onCancel: () => {
			setRoleModalProps((prev) => ({ ...prev, show: false }));
		},
	});
	const columns: ColumnsType<Role> = [
		{
			title: "Name",
			dataIndex: "name",
			width: 300,
		},
		{
			title: "Label",
			dataIndex: "label",
		},
		{ title: "Order", dataIndex: "order", width: 60 },
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
		{ title: "Desc", dataIndex: "desc" },
		{
			title: "Action",
			key: "operation",
			align: "center",
			width: 100,
			render: (_, record) => (
				<div className="flex w-full justify-center text-gray">
					<Button variant="ghost" size="icon" onClick={() => onEdit(record)}>
						<Icon icon="solar:pen-bold-duotone" size={18} />
					</Button>
					<Popconfirm title="Delete the Role" okText="Yes" cancelText="No" placement="left">
						<Button variant="ghost" size="icon">
							<Icon icon="mingcute:delete-2-fill" size={18} className="text-error!" />
						</Button>
					</Popconfirm>
				</div>
			),
		},
	];

	const onCreate = () => {
		setRoleModalProps((prev) => ({
			...prev,
			show: true,
			title: "Create New",
			formValue: {
				...prev.formValue,
				...DEFAULE_ROLE_VALUE,
			},
		}));
	};

	const onEdit = (formValue: Role) => {
		setRoleModalProps((prev) => ({
			...prev,
			show: true,
			title: "Edit",
			formValue,
		}));
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>Role List</div>
					<Button onClick={onCreate}>New</Button>
				</div>
			</CardHeader>
			<CardContent>
				<Table
					rowKey="id"
					size="small"
					scroll={{ x: "max-content" }}
					pagination={false}
					columns={columns}
					dataSource={ROLES}
				/>
			</CardContent>
			<RoleModal {...roleModalPros} />
		</Card>
	);
}
