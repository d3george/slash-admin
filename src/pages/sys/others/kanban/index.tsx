import {
	DndContext,
	type DragEndEvent,
	DragOverlay,
	type DragStartEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { faker } from "@faker-js/faker";
import { Button, Input, type InputRef } from "antd";
import { useRef, useState } from "react";
import { useEvent } from "react-use";
import SimpleBar from "simplebar-react";

import { Iconify } from "@/components/icon";
import KanbanColumn from "./kanban-column";
import KanbanTask from "./kanban-task";
import { initialData } from "./task-utils";
import type { Column, Columns, DndDataType, Task, Tasks } from "./types";

export default function Kanban() {
	const [state, setState] = useState(initialData);
	const [activeId, setActiveId] = useState<string | null>(null);
	const [activeType, setActiveType] = useState<"column" | "task" | null>(null);
	const [addingColumn, setAddingColumn] = useState(false);
	const inputRef = useRef<InputRef>(null);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
	);

	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event;
		setActiveId(active.id as string);
		// 通过判断 id 格式来确定拖拽类型
		setActiveType(active.id.toString().startsWith("task-") ? "task" : "column");
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (!over) {
			setActiveId(null);
			setActiveType(null);
			return;
		}

		if (active.id !== over.id) {
			if (activeType === "column") {
				// 处理列的拖拽
				const oldIndex = state.columnOrder.indexOf(active.id as string);
				const newIndex = state.columnOrder.indexOf(over.id as string);

				setState({
					...state,
					columnOrder: arrayMove(state.columnOrder, oldIndex, newIndex),
				});
			} else {
				// 处理任务的拖拽
				const activeColumn = Object.values(state.columns).find((col) => col.taskIds.includes(active.id as string));
				const overColumn = Object.values(state.columns).find(
					(col) => col.taskIds.includes(over.id as string) || col.id === over.id,
				);

				if (!activeColumn || !overColumn) return;

				if (activeColumn === overColumn) {
					// 同列内移动
					const newTaskIds = arrayMove(
						activeColumn.taskIds,
						activeColumn.taskIds.indexOf(active.id as string),
						activeColumn.taskIds.indexOf(over.id as string),
					);

					setState({
						...state,
						columns: {
							...state.columns,
							[activeColumn.id]: {
								...activeColumn,
								taskIds: newTaskIds,
							},
						},
					});
				} else {
					// 跨列移动
					const sourceTaskIds = activeColumn.taskIds.filter((id) => id !== active.id);
					const destinationTaskIds = [...overColumn.taskIds];
					const overTaskIndex = overColumn.taskIds.indexOf(over.id as string);

					destinationTaskIds.splice(
						overTaskIndex >= 0 ? overTaskIndex : destinationTaskIds.length,
						0,
						active.id as string,
					);

					setState({
						...state,
						columns: {
							...state.columns,
							[activeColumn.id]: {
								...activeColumn,
								taskIds: sourceTaskIds,
							},
							[overColumn.id]: {
								...overColumn,
								taskIds: destinationTaskIds,
							},
						},
					});
				}
			}
		}

		setActiveId(null);
		setActiveType(null);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (inputRef.current && !inputRef.current.input?.contains(event.target as Node)) {
			const inputVal = inputRef.current.input?.value;
			if (inputVal) {
				createColumn({
					id: faker.string.uuid(),
					title: inputVal,
					taskIds: [],
				});
			}
			setAddingColumn(false);
			console.log("click outside");
		}
	};
	useEvent("click", handleClickOutside);

	const createColumn = (column: Column) => {
		const newState: DndDataType = {
			...state,
			columns: {
				...state.columns,
				[column.id]: column,
			},
			columnOrder: [...state.columnOrder, column.id],
		};
		setState(newState);
	};

	const createTask = (columnId: string, task: Task) => {
		const column = state.columns[columnId];
		const newState: DndDataType = {
			...state,
			tasks: {
				...state.tasks,
				[task.id]: task,
			},
			columns: {
				...state.columns,
				[columnId]: {
					...column,
					taskIds: [...column.taskIds, task.id],
				},
			},
		};
		setState(newState);
	};

	const deletColumn = (columnId: string) => {
		const column = state.columns[columnId];
		const newTasks = Object.keys(state.tasks)
			.filter((key) => !column.taskIds.includes(key))
			.reduce((result, key) => {
				result[key] = state.tasks[key];
				return result;
			}, {} as Tasks);

		const newColumns = Object.keys(state.columns)
			.filter((key) => key !== columnId)
			.reduce((result, key) => {
				result[key] = state.columns[key];
				return result;
			}, {} as Columns);
		const newColumnOrder = Array.from(state.columnOrder).filter((item) => item !== columnId);

		const newState: DndDataType = {
			tasks: newTasks,
			columns: newColumns,
			columnOrder: newColumnOrder,
		};
		setState(newState);
	};

	const clearColumn = (columnId: string) => {
		const column = state.columns[columnId];
		const newTasks = Object.keys(state.tasks)
			.filter((key) => !column.taskIds.includes(key))
			.reduce((result, key) => {
				result[key] = state.tasks[key];
				return result;
			}, {} as Tasks);
		const newColumns = {
			...state.columns,
			[columnId]: {
				...column,
				taskIds: [],
			},
		};
		const newState: DndDataType = {
			...state,
			tasks: newTasks,
			columns: newColumns,
		};
		setState(newState);
	};

	const renameColumn = (column: Column) => {
		const { id, title } = column;
		const newColumns = {
			...state.columns,
			[id]: {
				...state.columns[id],
				title,
			},
		};
		const newState: DndDataType = {
			...state,
			columns: newColumns,
		};
		setState(newState);
	};

	return (
		<SimpleBar>
			<div className="flex">
				<DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
					<div className="flex h-full items-start gap-6 p-1">
						<SortableContext items={state.columnOrder} strategy={horizontalListSortingStrategy}>
							{state.columnOrder.map((columnId, index) => {
								const column = state.columns[columnId];
								const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

								return (
									<KanbanColumn
										key={columnId}
										id={columnId}
										index={index}
										column={column}
										tasks={tasks}
										createTask={createTask}
										clearColumn={clearColumn}
										deleteColumn={deletColumn}
										renameColumn={renameColumn}
									/>
								);
							})}
						</SortableContext>

						<DragOverlay>
							{activeId && activeType === "column" ? (
								<KanbanColumn
									id={activeId}
									index={state.columnOrder.indexOf(activeId)}
									column={state.columns[activeId]}
									tasks={state.columns[activeId].taskIds.map((id) => state.tasks[id])}
									createTask={createTask}
									clearColumn={clearColumn}
									deleteColumn={deletColumn}
									renameColumn={renameColumn}
									isDragging
								/>
							) : null}
							{activeId && activeType === "task" ? (
								<KanbanTask id={activeId} task={state.tasks[activeId]} isDragging />
							) : null}
						</DragOverlay>
					</div>
				</DndContext>

				<div className="ml-[1.6rem] mt-[0.25rem] min-w-[280px]">
					{addingColumn ? (
						<Input ref={inputRef} size="large" placeholder="Column Name" autoFocus />
					) : (
						<Button
							onClick={(e) => {
								e.stopPropagation();
								setAddingColumn(true);
							}}
							className="!inline-flex !w-full items-center justify-center !text-xs !font-semibold"
							block
							size="large"
						>
							<Iconify icon="carbon:add" size={20} />
							<div>Add Column</div>
						</Button>
					)}
				</div>
			</div>
		</SimpleBar>
	);
}
