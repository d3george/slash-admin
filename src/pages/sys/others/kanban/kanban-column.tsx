import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { faker } from "@faker-js/faker";
import { Button, Dropdown, Input, type InputRef, type MenuProps } from "antd";
import { type CSSProperties, useRef, useState } from "react";
import { useEvent } from "react-use";

import { Iconify } from "@/components/icon";
import { useSettings } from "@/store/settingStore";
import { ThemeMode } from "#/enum";
import KanbanTask from "./kanban-task";
import { type Column, type Task, TaskPriority } from "./types";

type Props = {
	id: string;
	index: number;
	column: Column;
	tasks: Task[];
	createTask: (columnId: string, task: Task) => void;
	clearColumn: (columnId: string) => void;
	deleteColumn: (columnId: string) => void;
	renameColumn: (column: Column) => void;
	isDragging?: boolean;
};

export default function KanbanColumn({
	id,
	column,
	tasks,
	createTask,
	clearColumn,
	deleteColumn,
	renameColumn,
	isDragging,
}: Props) {
	const { themeMode } = useSettings();
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

	const style: CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
		height: "100%",
		padding: "16px",
		borderRadius: "16px",
		backgroundColor: themeMode === ThemeMode.Light ? "rgb(244, 246, 248)" : "rgba(145, 158, 171, 0.12)",
		opacity: isDragging ? 0.5 : 1,
	};

	const items: MenuProps["items"] = [
		{
			key: "1",
			label: (
				<div
					className="flex items-center text-gray"
					onClick={() => {
						setRenamingTask(true);
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							setRenamingTask(true);
						}
					}}
				>
					<Iconify icon="solar:pen-bold" />
					<span className="ml-2">rename</span>
				</div>
			),
		},
		{
			key: "2",
			label: (
				<div
					className="flex items-center text-gray"
					onClick={() => clearColumn(column.id)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							clearColumn(column.id);
						}
					}}
				>
					<Iconify icon="solar:eraser-bold" />
					<span className="ml-2">clear</span>
				</div>
			),
		},
		{
			key: "3",
			label: (
				<div
					className="flex items-center text-warning"
					onClick={() => deleteColumn(column.id)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							deleteColumn(column.id);
						}
					}}
				>
					<Iconify icon="solar:trash-bin-trash-bold" />
					<span className="ml-2">delete</span>
				</div>
			),
		},
	];

	const [addingTask, setAddingTask] = useState(false);
	const addTaskInputRef = useRef<InputRef>(null);
	const handleClickOutside = (event: MouseEvent) => {
		if (addTaskInputRef.current && !addTaskInputRef.current.input?.contains(event.target as Node)) {
			const addTaskInputVal = addTaskInputRef.current.input?.value;
			if (addTaskInputVal) {
				createTask(column.id, {
					id: faker.string.uuid(),
					title: addTaskInputVal,
					reporter: faker.image.avatarGitHub(),
					priority: faker.helpers.enumValue(TaskPriority),
				});
			}
			setAddingTask(false);
		}

		if (renameTaskInputRef.current && !renameTaskInputRef.current.input?.contains(event.target as Node)) {
			const renameInputVal = renameTaskInputRef.current.input?.value;
			if (renameInputVal) {
				renameColumn({
					...column,
					title: renameInputVal,
				});
			}
			setRenamingTask(false);
		}
	};
	useEvent("click", handleClickOutside);

	const [renamingTask, setRenamingTask] = useState(false);
	const renameTaskInputRef = useRef<InputRef>(null);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const handleMenuItemClick = (menuInfo: any) => {
		setDropdownOpen(false);
		menuInfo.domEvent.stopPropagation();
	};
	return (
		<div ref={setNodeRef} style={style}>
			<header
				{...attributes}
				{...listeners}
				className="mb-4 flex select-none items-center justify-between text-base font-semibold"
			>
				{renamingTask ? <Input ref={renameTaskInputRef} size="large" autoFocus /> : column.title}
				<Dropdown
					open={dropdownOpen}
					onOpenChange={(flag) => setDropdownOpen(flag)}
					menu={{ items, onClick: handleMenuItemClick }}
					placement="bottomRight"
					trigger={["click"]}
				>
					<Button shape="circle" type="text" className="!text-gray">
						<Iconify icon="dashicons:ellipsis" />
					</Button>
				</Dropdown>
			</header>

			<SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
				<div className="min-h-[10px]">
					{tasks.map((task) => (
						<KanbanTask key={task.id} id={task.id} task={task} />
					))}
				</div>
			</SortableContext>

			<footer className="w-[248px]">
				{addingTask ? (
					<Input ref={addTaskInputRef} size="large" placeholder="Task Name" autoFocus />
				) : (
					<Button
						onClick={(e) => {
							e.stopPropagation();
							setAddingTask(true);
						}}
						className="!flex items-center justify-center !text-xs !font-medium"
						type="text"
						block
						size="large"
					>
						<Iconify icon="carbon:add" size={20} />
						<span>Add Task</span>
					</Button>
				)}
			</footer>
		</div>
	);
}
