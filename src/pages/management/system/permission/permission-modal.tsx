// import { useUserPermission } from "@/store/userStore";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { Input } from "@/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/ui/toggle-group";
import { AutoComplete, TreeSelect } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { Permission_Old } from "#/entity";
import { BasicStatus, PermissionType } from "#/enum";

// Constants
const ENTRY_PATH = "/src/pages";
const PAGES = import.meta.glob("/src/pages/**/*.tsx");
const PAGE_SELECT_OPTIONS = Object.entries(PAGES).map(([path]) => {
	const pagePath = path.replace(ENTRY_PATH, "");
	return {
		label: pagePath,
		value: pagePath,
	};
});

export type PermissionModalProps = {
	formValue: Permission_Old;
	title: string;
	show: boolean;
	onOk: (values: Permission_Old) => void;
	onCancel: VoidFunction;
};

export default function PermissionModal({ title, show, formValue, onOk, onCancel }: PermissionModalProps) {
	const form = useForm<Permission_Old>({
		defaultValues: formValue,
	});

	// TODO: fix
	// const permissions = useUserPermission();
	const permissions: any[] = [];
	const [compOptions, setCompOptions] = useState(PAGE_SELECT_OPTIONS);

	const getParentNameById = useCallback((parentId: string, data: Permission_Old[] | undefined = permissions) => {
		let name = "";
		if (!data || !parentId) return name;
		for (let i = 0; i < data.length; i += 1) {
			if (data[i].id === parentId) {
				name = data[i].name;
			} else if (data[i].children) {
				name = getParentNameById(parentId, data[i].children);
			}
			if (name) {
				break;
			}
		}
		return name;
	}, []);

	const updateCompOptions = useCallback((name: string) => {
		if (!name) return;
		setCompOptions(
			PAGE_SELECT_OPTIONS.filter((path) => {
				return path.value.includes(name.toLowerCase());
			}),
		);
	}, []);

	useEffect(() => {
		form.reset(formValue);
		if (formValue.parentId) {
			const parentName = getParentNameById(formValue.parentId);
			updateCompOptions(parentName);
		}
	}, [formValue, form, getParentNameById, updateCompOptions]);

	const onSubmit = (values: Permission_Old) => {
		onOk(values);
	};

	return (
		<Dialog open={show} onOpenChange={(open) => !open && onCancel()}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Type</FormLabel>
									<FormControl>
										<ToggleGroup
											type="single"
											variant="outline"
											className="w-auto"
											value={String(field.value)}
											onValueChange={(value) => {
												field.onChange(value);
											}}
										>
											<ToggleGroupItem value={String(PermissionType.CATALOGUE)}>CATALOGUE</ToggleGroupItem>
											<ToggleGroupItem value={String(PermissionType.MENU)}>MENU</ToggleGroupItem>
										</ToggleGroup>
									</FormControl>
								</FormItem>
							)}
						/>

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
							name="label"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Label</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="parentId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Parent</FormLabel>
									<FormControl>
										<TreeSelect
											fieldNames={{
												label: "name",
												value: "id",
												children: "children",
											}}
											allowClear
											treeData={permissions}
											value={field.value}
											onSelect={(value, node) => {
												field.onChange(value);
												if (node?.name) {
													updateCompOptions(node.name);
												}
											}}
											onChange={(value) => {
												field.onChange(value);
											}}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="route"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Route</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						{form.watch("type") === PermissionType.MENU && (
							<FormField
								control={form.control}
								name="component"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Component</FormLabel>
										<FormControl>
											<AutoComplete
												options={compOptions}
												filterOption={(input, option) => ((option?.label || "") as string).toLowerCase().includes(input.toLowerCase())}
												value={field.value || ""}
												onChange={(value) => field.onChange(value || null)}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						)}

						<FormField
							control={form.control}
							name="icon"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Icon</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="hide"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Hide</FormLabel>
									<FormControl>
										<ToggleGroup
											type="single"
											variant="outline"
											value={String(!!field.value)}
											onValueChange={(value) => {
												field.onChange(Boolean(value));
											}}
										>
											<ToggleGroupItem value="false">Show</ToggleGroupItem>
											<ToggleGroupItem value="true">Hide</ToggleGroupItem>
										</ToggleGroup>
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
										<ToggleGroup
											type="single"
											variant="outline"
											value={String(field.value)}
											onValueChange={(value) => {
												field.onChange(Number(value));
											}}
										>
											<ToggleGroupItem value={String(BasicStatus.ENABLE)}>Enable</ToggleGroupItem>
											<ToggleGroupItem value={String(BasicStatus.DISABLE)}>Disable</ToggleGroupItem>
										</ToggleGroup>
									</FormControl>
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button variant="outline" onClick={onCancel}>
								Cancel
							</Button>
							<Button type="submit" variant="default">
								Confirm
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
