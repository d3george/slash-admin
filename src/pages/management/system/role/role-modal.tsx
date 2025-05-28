import { Tree } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { PERMISSION_LIST } from "@/_mock/assets";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { Textarea } from "@/ui/textarea";
import { flattenTrees } from "@/utils/tree";

import type { Permission_Old, Role_Old } from "#/entity";
import { BasicStatus } from "#/enum";

export type RoleModalProps = {
	formValue: Role_Old;
	title: string;
	show: boolean;
	onOk: VoidFunction;
	onCancel: VoidFunction;
};
const PERMISSIONS: Permission_Old[] = PERMISSION_LIST as Permission_Old[];
export function RoleModal({ title, show, formValue, onOk, onCancel }: RoleModalProps) {
	const form = useForm<Role_Old>({
		defaultValues: formValue,
	});

	const [checkedKeys, setCheckedKeys] = useState<string[]>([]);

	useEffect(() => {
		const flattenedPermissions = flattenTrees(formValue.permission);
		setCheckedKeys(flattenedPermissions.map((item) => item.id));
	}, [formValue]);

	useEffect(() => {
		form.reset(formValue);
	}, [formValue, form]);

	const onCheck = (checked: any) => {
		setCheckedKeys(checked);
		form.setValue(
			"permission",
			PERMISSIONS.filter((item) => checked.includes(item.id)),
		);
	};

	return (
		<Dialog open={show} onOpenChange={(open) => !open && onCancel()}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="grid grid-cols-4 items-center gap-4">
									<FormLabel className="text-right">Name</FormLabel>
									<div className="col-span-3">
										<FormControl>
											<Input {...field} />
										</FormControl>
									</div>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="code"
							render={({ field }) => (
								<FormItem className="grid grid-cols-4 items-center gap-4">
									<FormLabel className="text-right">Label</FormLabel>
									<div className="col-span-3">
										<FormControl>
											<Input {...field} />
										</FormControl>
									</div>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="order"
							render={({ field }) => (
								<FormItem className="grid grid-cols-4 items-center gap-4">
									<FormLabel className="text-right">Order</FormLabel>
									<div className="col-span-3">
										<FormControl>
											<Input type="number" {...field} />
										</FormControl>
									</div>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem className="grid grid-cols-4 items-center gap-4">
									<FormLabel className="text-right">Status</FormLabel>
									<div className="col-span-3">
										<FormControl>
											<RadioGroup onValueChange={(value) => field.onChange(Number(value))} defaultValue={String(field.value)}>
												<div className="flex items-center space-x-2">
													<RadioGroupItem value={String(BasicStatus.ENABLE)} id="r1" />
													<Label htmlFor="r1">Enable</Label>
												</div>
												<div className="flex items-center space-x-2">
													<RadioGroupItem value={String(BasicStatus.DISABLE)} id="r2" />
													<Label htmlFor="r2">Disable</Label>
												</div>
											</RadioGroup>
										</FormControl>
									</div>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="desc"
							render={({ field }) => (
								<FormItem className="grid grid-cols-4 items-center gap-4">
									<FormLabel className="text-right">Desc</FormLabel>
									<div className="col-span-3">
										<FormControl>
											<Textarea {...field} />
										</FormControl>
									</div>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="permission"
							render={() => (
								<FormItem className="grid grid-cols-4 items-center gap-4">
									<FormLabel className="text-right">Permission</FormLabel>
									<div className="col-span-3">
										<FormControl>
											<Tree
												checkable
												checkedKeys={checkedKeys}
												treeData={PERMISSIONS}
												fieldNames={{
													key: "id",
													children: "children",
													title: "name",
												}}
												onCheck={onCheck}
											/>
										</FormControl>
									</div>
								</FormItem>
							)}
						/>
					</div>
				</Form>
				<DialogFooter>
					<Button variant="outline" onClick={onCancel}>
						Cancel
					</Button>
					<Button
						onClick={() => {
							form.handleSubmit(onOk)();
						}}
					>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
