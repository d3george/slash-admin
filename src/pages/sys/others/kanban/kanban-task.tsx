import { Avatar, Drawer, Image, Select } from "antd";
import Color from "color";
import { type CSSProperties, memo, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import CyanBlur from "@/assets/images/background/cyan-blur.png";
import RedBlur from "@/assets/images/background/red-blur.png";
import { IconButton, Iconify, SvgIcon } from "@/components/icon";
import { type Task, TaskPriority } from "@/pages/sys/others/kanban/types";
import { useThemeToken } from "@/theme/hooks";

import TaskDetail from "./task-detail";

import { themeVars } from "@/theme/theme.css";

type Props = {
	index: number;
	task: Task;
};
function KanbanTask({ index, task }: Props) {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const themeToken = useThemeToken();

	const style: CSSProperties = {
		backdropFilter: "blur(20px)",
		backgroundImage: `url("${CyanBlur}"), url("${RedBlur}")`,
		backgroundRepeat: "no-repeat, no-repeat",
		backgroundColor: Color(themeToken.colorBgContainer).alpha(0.9).toString(),
		backgroundPosition: "right top, left bottom",
		backgroundSize: "50, 50%",
	};

	const { id, title, comments = [], attachments = [], priority, assignee } = task;
	return (
		<>
			<Draggable draggableId={id} index={index}>
				{(provided, snapshot) => (
					<Container
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						$isDragging={snapshot.isDragging}
					>
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
													color: themeToken.colorPrimary,
													backgroundColor: themeToken.colorPrimaryBg,
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
				)}
			</Draggable>
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
								<Iconify icon="solar:like-bold" size={20} color={themeToken.colorSuccess} />
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

// 在这里使用memo很重要，因为drag column时，不应该重复渲染内部的task
export default memo(KanbanTask);

type TaskPrioritySvgProps = {
	taskPriority: TaskPriority;
};
function TaskPrioritySvg({ taskPriority }: TaskPrioritySvgProps) {
	const { colorSuccess, colorInfo, colorWarning } = useThemeToken();
	switch (taskPriority) {
		case TaskPriority.HIGH:
			return <SvgIcon icon="ic_rise" size={20} color={colorWarning} className="" />;
		case TaskPriority.MEDIUM:
			return <SvgIcon icon="ic_rise" size={20} color={colorSuccess} className="rotate-90" />;
		case TaskPriority.LOW:
			return <SvgIcon icon="ic_rise" size={20} color={colorInfo} className="rotate-180" />;
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
