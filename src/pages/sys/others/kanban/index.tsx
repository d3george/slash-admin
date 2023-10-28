import { faker } from '@faker-js/faker';
import { Button, Input, InputRef } from 'antd';
import { useRef, useState } from 'react';
import { DragDropContext, DropResult, Droppable, OnDragEndResponder } from 'react-beautiful-dnd';
import { useEvent } from 'react-use';
import SimpleBar from 'simplebar-react';

import { Iconify } from '@/components/icon';
import KanbanColumn from '@/pages/sys/others/kanban/kanban-column';
import {
  Column,
  Columns,
  DndDataType,
  DragType,
  Task,
  Tasks,
} from '@/pages/sys/others/kanban/types';

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

  const [addingColumn, setAddingColumn] = useState(false);
  const inputRef = useRef<InputRef>(null);

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
      console.log('click outside');
    }
  };
  useEvent('click', handleClickOutside);

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

                  return (
                    <KanbanColumn
                      key={columnId}
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
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

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
