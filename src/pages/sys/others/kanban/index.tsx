import { useState } from 'react';
import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd';

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

    const column = state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn: Column = {
      ...column,
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
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {state.columnOrder.map((columnId) => {
        const column = state.columns[columnId];
        const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

        return <KanbanColumn key={columnId} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
}
