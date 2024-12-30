import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Avatar, Drawer, Image, Select } from "antd";
import { type CSSProperties, memo, useState } from "react";
import styled from "styled-components";

import { IconButton, Iconify, SvgIcon } from "@/components/icon";
import { themeVars } from "@/theme/theme.css";
import { rgbAlpha } from "@/utils/theme";
import TaskDetail from "./task-detail";
import { type Task, TaskPriority } from "./types";

type Props = {
	id: string;
	task: Task;
	isDragging?: boolean;
};

function KanbanTask({ id, task, isDragging }: Props) {
	const [drawerOpen, setDrawerOpen] = useState(false);

	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

	const style: CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const { title, comments = [], attachments = [], priority, assignee } = task;

	return (
		<>
			<Container ref={setNodeRef} style={style} {...attributes} {...listeners} $isDragging={!!isDragging}>
				<div>
					{attachments.length > 0 && <Image src={attachments[0]} alt="" className="mb-4 rounded-md" />}
					<div onClick={() => setDrawerOpen(true)}>
						<div className="flex justify-end">
							<TaskPrioritySvg taskPriority={priority} />
						</div>
						<div>{title}</div>
						<div className="mt-4 flex items-center justify-between">
							<div className="flex items-center text-base text-gray-600">
								<Iconify icon="uim:comment-dots" size={16} className="mr-1" />
								<span className="text-xs">{comments.length}</span>

								<Iconify icon="iconamoon:attachment-bold" size={16} className="ml-2 mr-1" />
								<span className="text-xs">{attachments.length}</span>
							</div>

							{assignee?.length && (
								<Avatar.Group
									max={{
										count: 3,
										style: {
											color: themeVars.colors.palette.primary.default,
											backgroundColor: rgbAlpha(themeVars.colors.palette.primary.default, 0.9),
										},
									}}
								>
									{assignee.map((url) => (
										<Avatar key={url} src={url} />
									))}
								</Avatar.Group>
							)}
						</div>
					</div>
				</div>
			</Container>
			<Drawer
				placement="right"
				title={
					<div className="flex items-center justify-between">
						<div>
							<Select
								defaultValue="To do"
								size="large"
								variant="borderless"
								dropdownStyle={{
									width: "auto",
								}}
								options={[
									{ value: "To do", label: "To do" },
									{ value: "In progress", label: "In progress" },
									{ value: "Done", label: "Done" },
								]}
							/>
						</div>
						<div className="flex text-gray">
							<IconButton>
								<Iconify icon="solar:like-bold" size={20} color={themeVars.colors.palette.success.default} />
							</IconButton>
							<IconButton>
								<Iconify icon="solar:trash-bin-trash-bold" size={20} />
							</IconButton>
							<IconButton>
								<Iconify icon="fontisto:more-v-a" size={20} />
							</IconButton>
						</div>
					</div>
				}
				onClose={() => setDrawerOpen(false)}
				open={drawerOpen}
				closable={false}
				width={420}
				styles={{
					body: { padding: 0 },
					mask: { backgroundColor: "transparent" },
				}}
				style={style}
			>
				<TaskDetail task={task} />
			</Drawer>
		</>
	);
}

export default memo(KanbanTask);

type TaskPrioritySvgProps = {
	taskPriority: TaskPriority;
};
function TaskPrioritySvg({ taskPriority }: TaskPrioritySvgProps) {
	switch (taskPriority) {
		case TaskPriority.HIGH:
			return <SvgIcon icon="ic_rise" size={20} color={themeVars.colors.palette.warning.default} className="" />;
		case TaskPriority.MEDIUM:
			return (
				<SvgIcon icon="ic_rise" size={20} color={themeVars.colors.palette.success.default} className="rotate-90" />
			);
		case TaskPriority.LOW:
			return <SvgIcon icon="ic_rise" size={20} color={themeVars.colors.palette.info.default} className="rotate-180" />;
		default:
			break;
	}
}
const Container = styled.div<{ $isDragging: boolean }>`
	width: 248px;
	border-radius: 12px;
	padding: 16px;
	margin-bottom: 16px;
	font-weight: 400;
	font-size: 12px;
	background-color: ${themeVars.colors.background.default};
	backdrop-filter: ${(props) => (props.$isDragging ? "blur(6px)" : "")};

	&:hover {
		box-shadow: ${themeVars.shadows["3xl"]};
	}
`;
