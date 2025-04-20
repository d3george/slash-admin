import orgService from "@/api/services/orgService";
import { Icon } from "@/components/icon";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import { Textarea } from "@/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { Form, Modal, Popconfirm, Space, Tag } from "antd";
import Table, { type ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import type { Organization } from "#/entity";
import OrganizationChart from "./organization-chart";

type SearchFormFieldType = Pick<Organization, "name" | "status">;

export default function OrganizationPage() {
	const [searchForm] = Form.useForm();
	const [organizationModalPros, setOrganizationModalProps] = useState<OrganizationModalProps>({
		formValue: {
			id: "",
			name: "",
			status: "enable",
		},
		title: "New",
		show: false,
		onOk: () => {
			setOrganizationModalProps((prev) => ({ ...prev, show: false }));
		},
		onCancel: () => {
			setOrganizationModalProps((prev) => ({ ...prev, show: false }));
		},
	});

	const columns: ColumnsType<Organization> = [
		{ title: "Name", dataIndex: "name", width: 300 },
		{ title: "Order", dataIndex: "order", align: "center", width: 60 },
		{
			title: "Status",
			dataIndex: "status",
			align: "center",
			width: 120,
			render: (status) => <Tag color={status === "enable" ? "success" : "error"}>{status}</Tag>,
		},
		{ title: "Desc", dataIndex: "desc", align: "center", width: 300 },
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
					<Popconfirm title="Delete the Organization" okText="Yes" cancelText="No" placement="left">
						<Button variant="ghost" size="icon">
							<Icon icon="mingcute:delete-2-fill" size={18} className="text-error" />
						</Button>
					</Popconfirm>
				</div>
			),
		},
	];

	// rowSelection objects indicates the need for row selection
	const rowSelection: TableRowSelection<Organization> = {
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
		},
		onSelect: (record, selected, selectedRows) => {
			console.log(record, selected, selectedRows);
		},
		onSelectAll: (selected, selectedRows, changeRows) => {
			console.log(selected, selectedRows, changeRows);
		},
	};

	const { data } = useQuery({
		queryKey: ["orgs"],
		queryFn: orgService.getOrgList,
	});

	const onSearchFormReset = () => {
		searchForm.resetFields();
	};

	const onCreate = () => {
		setOrganizationModalProps((prev) => ({
			...prev,
			show: true,
			title: "Create New",
			formValue: {
				...prev.formValue,
				id: "",
				name: "",
				order: 1,
				desc: "",
				status: "enable",
			},
		}));
	};

	const onEdit = (formValue: Organization) => {
		setOrganizationModalProps((prev) => ({
			...prev,
			show: true,
			title: "Edit",
			formValue,
		}));
	};

	return (
		<Space direction="vertical" size="large" className="w-full">
			<Card>
				<CardContent>
					<Form form={searchForm}>
						<div className="flex items-center gap-4">
							<Form.Item<SearchFormFieldType> label="Name" name="name" className="mb-0!">
								<Input />
							</Form.Item>
							<Form.Item<SearchFormFieldType> label="Status" name="status" className="mb-0!">
								<Select>
									<SelectTrigger>
										<SelectValue placeholder="Select Status" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="enable">
											<Tag color="success">Enable</Tag>
										</SelectItem>
										<SelectItem value="disable">
											<Tag color="error">Disable</Tag>
										</SelectItem>
									</SelectContent>
								</Select>
							</Form.Item>
							<div className="flex ml-auto">
								<Button variant="outline" onClick={onSearchFormReset}>
									Reset
								</Button>
								<Button className="ml-4">Search</Button>
							</div>
						</div>
					</Form>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>Organization List</div>
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
						dataSource={data}
						rowSelection={{ ...rowSelection }}
					/>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>Organization Chart</CardHeader>
				<CardContent>
					<OrganizationChart organizations={data} />
				</CardContent>
			</Card>

			<OrganizationModal {...organizationModalPros} />
		</Space>
	);
}

type OrganizationModalProps = {
	formValue: Organization;
	title: string;
	show: boolean;
	onOk: VoidFunction;
	onCancel: VoidFunction;
};

function OrganizationModal({ title, show, formValue, onOk, onCancel }: OrganizationModalProps) {
	const [form] = Form.useForm();
	useEffect(() => {
		form.setFieldsValue({ ...formValue });
	}, [formValue, form]);
	return (
		<Modal title={title} open={show} onOk={onOk} onCancel={onCancel}>
			<Form initialValues={formValue} form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} layout="horizontal">
				<Form.Item<Organization> label="Name" name="name" required>
					<Input />
				</Form.Item>
				<Form.Item<Organization> label="Order" name="order" required>
					<Input type="number" />
				</Form.Item>
				<Form.Item<Organization> label="Status" name="status" required>
					<RadioGroup className="flex gap-2">
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="enable" id="r1" />
							<Label htmlFor="r1">Enable</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="disable" id="r2" />
							<Label htmlFor="r2">Disable</Label>
						</div>
					</RadioGroup>
				</Form.Item>
				<Form.Item<Organization> label="Desc" name="desc">
					<Textarea />
				</Form.Item>
			</Form>
		</Modal>
	);
}
