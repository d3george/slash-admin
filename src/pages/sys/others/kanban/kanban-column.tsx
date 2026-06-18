import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { faker } from "@faker-js/faker";
import { type CSSProperties, useRef, useState } from "react";
import { useEvent } from "react-use";
import { ThemeMode } from "#/enum";
import { Icon } from "@/components/icon";
import { useSettings } from "@/store/settingStore";
import { Button } from "@/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/dropdown-menu";
import { Input } from "@/ui/input";
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

	const [addingTask, setAddingTask] = useState(false);
	const addTaskInputRef = useRef<HTMLInputElement>(null);
	const handleClickOutside = (event: MouseEvent) => {
		if (addTaskInputRef.current && !addTaskInputRef.current.contains(event.target as Node)) {
			const addTaskInputVal = addTaskInputRef.current.value;
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

		if (renameColumnInputRef.current && !renameColumnInputRef.current.contains(event.target as Node)) {
			const renameInputVal = renameColumnInputRef.current.value;
			if (renameInputVal) {
				renameColumn({
					...column,
					title: renameInputVal,
				});
			}
			setRenamingColumn(false);
		}
	};
	useEvent("click", handleClickOutside);

	const [renamingColumn, setRenamingColumn] = useState(false);
	const renameColumnInputRef = useRef<HTMLInputElement>(null);

	return (
		<div ref={setNodeRef} style={style}>
			<header
				{...attributes}
				{...listeners}
				className="mb-4 flex select-none items-center justify-between text-base font-semibold"
			>
				{renamingColumn ? <Input ref={renameColumnInputRef} autoFocus /> : column.title}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon" className="text-gray!">
							<Icon icon="dashicons:ellipsis" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							onClick={(event) => {
								event.stopPropagation();
								setRenamingColumn(true);
							}}
						>
							<Icon icon="solar:pen-bold" />
							<span className="ml-2">rename</span>
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={(event) => {
								event.stopPropagation();
								clearColumn(column.id);
							}}
						>
							<Icon icon="solar:eraser-bold" />
							<span className="ml-2">clear</span>
						</DropdownMenuItem>
						<DropdownMenuItem
							variant="destructive"
							onClick={(event) => {
								event.stopPropagation();
								deleteColumn(column.id);
							}}
						>
							<Icon icon="solar:trash-bin-trash-bold" />
							<span className="ml-2">delete</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
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
					<Input ref={addTaskInputRef} placeholder="Task Name" autoFocus />
				) : (
					<Button
						onClick={(e) => {
							e.stopPropagation();
							setAddingTask(true);
						}}
						className="flex! items-center justify-center text-xs! font-medium! w-full"
					>
						<Icon icon="carbon:add" size={20} />
						<span>Add Task</span>
					</Button>
				)}
			</footer>
		</div>
	);
}
