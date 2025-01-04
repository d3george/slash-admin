import {
	DndContext,
	type DragEndEvent,
	DragOverlay,
	type DragStartEvent,
	KeyboardSensor,
	MeasuringStrategy,
	PointerSensor,
	TouchSensor,
	closestCenter,
	defaultDropAnimationSideEffects,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import React from "react";

interface SortableContainerProps {
	items: any[];
	onSortEnd?: (oldIndex: number, newIndex: number) => void;
	children: React.ReactNode;
	renderOverlay?: (activeId: string | number) => React.ReactNode;
}

const SortableContainer: React.FC<SortableContainerProps> = ({ items, onSortEnd, children, renderOverlay }) => {
	const [activeId, setActiveId] = React.useState<string | number | null>(null);

	// 配置拖拽传感器
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8, // 8px 的移动距离后才触发拖拽
			},
		}),
		useSensor(TouchSensor),
		useSensor(KeyboardSensor),
	);

	// 开始拖拽时的处理
	const handleDragStart = (event: DragStartEvent) => {
		setActiveId(event.active.id);
	};

	// 结束拖拽时的处理
	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		setActiveId(null);

		if (over && active.id !== over.id) {
			const oldIndex = items.findIndex((item) => item.key === active.id);
			const newIndex = items.findIndex((item) => item.key === over.id);

			if (oldIndex !== -1 && newIndex !== -1) {
				onSortEnd?.(oldIndex, newIndex);
			}
		}
	};

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
		>
			<SortableContext items={items.map((item) => item.key)} strategy={horizontalListSortingStrategy}>
				{children}
			</SortableContext>

			<DragOverlay
				dropAnimation={{
					sideEffects: defaultDropAnimationSideEffects({
						styles: {
							active: {
								opacity: "0.5",
							},
						},
					}),
				}}
			>
				{activeId && renderOverlay ? renderOverlay(activeId) : null}
			</DragOverlay>
		</DndContext>
	);
};

export default SortableContainer;
