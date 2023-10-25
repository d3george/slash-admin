import { useState } from 'react';
import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd';
import SimpleBar from 'simplebar-react';

import KanbanColumn from '@/pages/sys/others/kanban/kanban-column';
import { Column, DndDataType } from '@/pages/sys/others/kanban/types';

import { initialData } from './task-utils';

export default function Kanban() {
  const [state, setState] = useState(initialData);

  const onDragEnd: OnDragEndResponder = (result) => {
    const { source, destination, draggableId } = result;
    // 拖拽到非法非 droppable区域
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    // moving task in one column
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

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
      return;
    }

    // moving task from on column to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart: Column = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
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
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <SimpleBar className="h-full">
        <div className="flex h-full items-start gap-6 p-1">
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

            return <KanbanColumn key={columnId} column={column} tasks={tasks} />;
          })}
        </div>
      </SimpleBar>
    </DragDropContext>
  );
}
