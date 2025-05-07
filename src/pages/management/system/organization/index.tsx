import orgService from "@/api/services/orgService";
import { Icon } from "@/components/icon";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import { Textarea } from "@/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import Table, { type ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { Organization } from "#/entity";
import OrganizationChart from "./organization-chart";

type SearchFormFieldType = Pick<Organization, "name" | "status">;

export default function OrganizationPage() {
	const searchForm = useForm<SearchFormFieldType>();
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
			render: (status) => (
				<Badge variant={status === "enable" ? "success" : "error"}>
					{status.charAt(0).toUpperCase() + status.slice(1)}
				</Badge>
			),
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
					<Button variant="ghost" size="icon">
						<Icon icon="mingcute:delete-2-fill" size={18} className="text-error!" />
					</Button>
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
		searchForm.reset();
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
		<div className="flex flex-col gap-4">
			<Card>
				<CardContent>
					<Form {...searchForm}>
						<div className="flex items-center gap-4">
							<FormField
								control={searchForm.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={searchForm.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Status</FormLabel>
										<Select onValueChange={field.onChange} value={field.value}>
											<SelectTrigger>
												<SelectValue placeholder="Select Status" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="enable">
													<Badge variant="success">Enable</Badge>
												</SelectItem>
												<SelectItem value="disable">
													<Badge variant="error">Disable</Badge>
												</SelectItem>
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
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
		</div>
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
	const form = useForm<Organization>({
		defaultValues: formValue,
	});

	useEffect(() => {
		form.reset(formValue);
	}, [formValue, form]);

	return (
		<Dialog open={show} onOpenChange={(open) => !open && onCancel()}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<div className="grid gap-4 py-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="order"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Order</FormLabel>
									<FormControl>
										<Input type="number" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status</FormLabel>
									<FormControl>
										<RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-2">
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="enable" id="r1" />
												<Label htmlFor="r1">Enable</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="disable" id="r2" />
												<Label htmlFor="r2">Disable</Label>
											</div>
										</RadioGroup>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="desc"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Desc</FormLabel>
									<FormControl>
										<Textarea {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
					<DialogFooter>
						<Button variant="outline" onClick={onCancel}>
							Cancel
						</Button>
						<Button onClick={onOk}>Save</Button>
					</DialogFooter>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
