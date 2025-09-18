// import { useUserPermission } from "@/store/userStore";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { Input } from "@/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/ui/toggle-group";
import { TreeSelect } from "antd";
import { useForm } from "react-hook-form";
import type { CaseInfo } from "#/entity";
import { BasicStatus } from "#/enum";

// Constants
export type CaseModalProps = {
	formValue: CaseInfo;
	title: string;
	show: boolean;
	onOk: (values: CaseInfo) => void;
	onCancel: VoidFunction;
};

export default function CaseModal({ title, show, formValue, onOk, onCancel }: CaseModalProps) {
	const form = useForm<CaseInfo>({
		defaultValues: formValue,
	});

	// TODO: fix
	// const permissions = useUserPermission();
	const permissions: any[] = [];

	const onSubmit = (values: CaseInfo) => {
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
						{/* <FormField
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
            /> */}

						<FormField
							control={form.control}
							name="pid"
							render={({ field }) => (
								<FormItem>
									<FormLabel>患者编号</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="cid"
							render={({ field }) => (
								<FormItem>
									<FormLabel>病例号/影像号/检查号</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="pid"
							render={({ field }) => (
								<FormItem>
									<FormLabel>患者信息</FormLabel>
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
											onSelect={(value) => {
												field.onChange(value);
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
							name="impression"
							render={({ field }) => (
								<FormItem>
									<FormLabel>影像所见</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="results"
							render={({ field }) => (
								<FormItem>
									<FormLabel>结论</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="clinicalResults"
							render={({ field }) => (
								<FormItem>
									<FormLabel>从系统自动拉取</FormLabel>
									<FormControl>
										<ToggleGroup
											type="single"
											variant="outline"
											value={String(!!field.value)}
											onValueChange={(value) => {
												field.onChange(Boolean(value));
											}}
										>
											<ToggleGroupItem value="false">自动拉取</ToggleGroupItem>
											<ToggleGroupItem value="true">手动添加</ToggleGroupItem>
										</ToggleGroup>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="history"
							render={({ field }) => (
								<FormItem>
									<FormLabel>病理/临床结果</FormLabel>
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
									<FormLabel>主诉</FormLabel>
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
									<FormLabel>是否启用</FormLabel>
									<FormControl>
										<ToggleGroup
											type="single"
											variant="outline"
											value={String(field.value)}
											onValueChange={(value) => {
												field.onChange(Number(value));
											}}
										>
											<ToggleGroupItem value={String(BasicStatus.ENABLE)}>公开</ToggleGroupItem>
											<ToggleGroupItem value={String(BasicStatus.DISABLE)}>私有</ToggleGroupItem>
										</ToggleGroup>
									</FormControl>
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button variant="outline" onClick={onCancel}>
								取消
							</Button>
							<Button type="submit" variant="default">
								确认
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
