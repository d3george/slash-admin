import { useState } from 'react';
import { DragDropContext, DropResult, Droppable, OnDragEndResponder } from 'react-beautiful-dnd';
import SimpleBar from 'simplebar-react';

import KanbanColumn from '@/pages/sys/others/kanban/kanban-column';
import { Column, DndDataType, DragType } from '@/pages/sys/others/kanban/types';

import { initialData } from './task-utils';

export default function Kanban() {
  const [state, setState] = useState(initialData);

  // dragtype == task
  const handleTaskDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    const start = state.columns[source.droppableId];
    const finish = state.columns[destination!.droppableId];

    if (start === finish) {
      // moving task in one column
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination!.index, 0, draggableId);

      const newColumn: Column = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState: DndDataType = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
    } else {
      // moving task from on column to another
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart: Column = {
        ...start,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination!.index, 0, draggableId);
      const newFinish: Column = {
        ...finish,
        taskIds: finishTaskIds,
      };

      const newState: DndDataType = {
        ...state,
        columns: {
          ...state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };

      setState(newState);
    }
  };

  // dragtype == column
  const handleColumnDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    const newColumnOrder = Array.from(state.columnOrder);
    newColumnOrder.splice(source.index, 1);
    newColumnOrder.splice(destination!.index, 0, draggableId);
    const newState: DndDataType = {
      ...state,
      columnOrder: newColumnOrder,
    };
    setState(newState);
  };

  const onDragEnd: OnDragEndResponder = (result) => {
    const { source, destination, type } = result;
    // 拖拽到非法非 droppable区域
    if (!destination) {
      return;
    }
    // 原地放下
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === DragType.COLUMN) {
      handleColumnDragEnd(result);
    } else {
      handleTaskDragEnd(result);
    }
  };

  return (
    <SimpleBar className="h-full">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type={DragType.COLUMN}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex h-full items-start gap-6 p-1"
            >
              {state.columnOrder.map((columnId, index) => {
                const column = state.columns[columnId];
                const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

                return <KanbanColumn key={columnId} index={index} column={column} tasks={tasks} />;
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </SimpleBar>
  );
}
