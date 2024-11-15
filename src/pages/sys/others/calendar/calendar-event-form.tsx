import { faker } from "@faker-js/faker";
import type { EventInput } from "@fullcalendar/core";
import { ColorPicker, DatePicker, Form, Input, Modal, Switch } from "antd";
import type { Dayjs } from "dayjs";
import { useEffect } from "react";

import { IconButton, Iconify } from "@/components/icon";

import type { ModalProps } from "antd/es/modal/interface";

export type CalendarEventFormFieldType = Pick<
	EventInput,
	"title" | "allDay" | "color"
> & {
	id: string;
	description?: string;
	start?: Dayjs;
	end?: Dayjs;
};

type Props = {
	type: "edit" | "add";
	open: boolean;
	onCancel: VoidFunction;
	onEdit: (event: CalendarEventFormFieldType) => void;
	onCreate: (event: CalendarEventFormFieldType) => void;
	onDelete: (id: string) => void;
	initValues: CalendarEventFormFieldType;
};

const COLORS = [
	"#00a76f",
	"#8e33ff",
	"#00b8d9",
	"#003768",
	"#22c55e",
	"#ffab00",
	"#ff5630",
	"#7a0916",
];

export default function CalendarEventForm({
	type,
	open,
	onCancel,
	initValues = { id: faker.string.uuid() },
	onEdit,
	onCreate,
	onDelete,
}: Props) {
	const title = type === "add" ? "Add Event" : "Edit Event";
	const [form] = Form.useForm();

	useEffect(() => {
		// 当 initValues 改变时，手动更新表单的值
		const { color = COLORS[0], ...others } = initValues;
		form.setFieldsValue({ ...others, color });
	}, [initValues, form]);

	// eslint-disable-next-line react/no-unstable-nested-components, react/function-component-definition
	const ModalFooter: ModalProps["footer"] = (_, { OkBtn, CancelBtn }) => {
		return (
			<div>
				{type === "edit" ? (
					<div className="flex justify-between">
						<IconButton
							onClick={() => {
								onDelete(initValues.id);
								onCancel();
							}}
						>
							<Iconify icon="fluent:delete-16-filled" size={20} />
						</IconButton>
						<div>
							<CancelBtn />
							<OkBtn />
						</div>
					</div>
				) : (
					<>
						<CancelBtn />
						<OkBtn />
					</>
				)}
			</div>
		);
	};

	return (
		<Modal
			open={open}
			title={title}
			centered
			onCancel={onCancel}
			footer={ModalFooter}
			onOk={() => {
				form
					.validateFields()
					.then((values) => {
						form.resetFields();

						const { id } = initValues;
						const event = { ...values, id };
						if (type === "add") onCreate(event);
						if (type === "edit") onEdit(event);
						onCancel();
					})
					.catch((info) => {
						console.log("Validate Failed:", info);
					});
			}}
		>
			<Form
				form={form}
				size="small"
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 18 }}
				initialValues={initValues}
			>
				<Form.Item<CalendarEventFormFieldType>
					label="Titile"
					name="title"
					rules={[{ required: true, message: "Please input title!" }]}
				>
					<Input />
				</Form.Item>

				<Form.Item<CalendarEventFormFieldType> label="Desc" name="description">
					<Input.TextArea />
				</Form.Item>

				<Form.Item<CalendarEventFormFieldType>
					label="All day"
					name="allDay"
					valuePropName="checked"
				>
					<Switch />
				</Form.Item>

				<Form.Item<CalendarEventFormFieldType>
					label="Start date"
					name="start"
					rules={[{ required: true, message: "Please input start date!" }]}
				>
					<DatePicker
						showTime
						className="w-full"
						format="YYYY-MM-DD HH:mm:ss"
					/>
				</Form.Item>

				<Form.Item<CalendarEventFormFieldType>
					label="End date"
					name="end"
					rules={[{ required: true, message: "Please input end date!" }]}
				>
					<DatePicker
						showTime
						className="w-full"
						format="YYYY-MM-DD HH:mm:ss"
					/>
				</Form.Item>

				<Form.Item<CalendarEventFormFieldType>
					label="Color"
					name="color"
					getValueFromEvent={(e) => e.toHexString()}
				>
					<ColorPicker
						presets={[
							{
								label: "Recommended",
								colors: COLORS,
							},
						]}
					/>
				</Form.Item>
			</Form>
		</Modal>
	);
}
