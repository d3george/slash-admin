import { Icon } from "@/components/icon";
import { themeVars } from "@/theme/theme.css";
import { Avatar, AvatarImage } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import { Sheet, SheetContent, SheetHeader } from "@/ui/sheet";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type CSSProperties, memo, useState } from "react";
import styled from "styled-components";
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
					{attachments.length > 0 && <img src={attachments[0]} alt="" className="mb-4 rounded-md" />}
					<div onClick={() => setDrawerOpen(true)}>
						<div className="flex justify-end">
							<TaskPrioritySvg taskPriority={priority} />
						</div>
						<div>{title}</div>
						<div className="mt-4 flex items-center justify-between">
							<div className="flex items-center text-base text-gray-600">
								<Icon icon="uim:comment-dots" size={16} className="mr-1" />
								<span className="text-xs">{comments.length}</span>

								<Icon icon="iconamoon:attachment-bold" size={16} className="ml-2 mr-1" />
								<span className="text-xs">{attachments.length}</span>
							</div>

							{assignee?.length && (
								<div className="flex gap-2 -space-x-4">
									{assignee.slice(0, 3).map((url) => (
										<Avatar key={url}>
											<AvatarImage src={url} />
										</Avatar>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</Container>

			<Sheet open={drawerOpen} modal={false} onOpenChange={setDrawerOpen}>
				<SheetContent className="w-[420px] p-0 [&>button]:hidden pointer-events-auto">
					<SheetHeader>
						<div className="flex items-center justify-between">
							<div>
								<Select defaultValue="To do">
									<SelectTrigger size="default">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="To do">To do</SelectItem>
										<SelectItem value="In progress">In progress</SelectItem>
										<SelectItem value="Done">Done</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="flex text-gray">
								<Button variant="ghost" size="icon">
									<Icon icon="solar:like-bold" size={20} className="text-success!" />
								</Button>
								<Button variant="ghost" size="icon">
									<Icon icon="solar:trash-bin-trash-bold" size={20} className="text-error!" />
								</Button>
								<Button variant="ghost" size="icon">
									<Icon icon="fontisto:more-v-a" size={20} />
								</Button>
							</div>
						</div>
					</SheetHeader>
					<TaskDetail task={task} />
				</SheetContent>
			</Sheet>
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
			return <Icon icon="local:ic-rise" size={20} color={themeVars.colors.palette.warning.default} className="" />;
		case TaskPriority.MEDIUM:
			return (
				<Icon icon="local:ic-rise" size={20} color={themeVars.colors.palette.success.default} className="rotate-90" />
			);
		case TaskPriority.LOW:
			return (
				<Icon icon="local:ic-rise" size={20} color={themeVars.colors.palette.info.default} className="rotate-180" />
			);
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
