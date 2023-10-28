import { faker } from '@faker-js/faker';
import { Button, Dropdown, Input, InputRef, MenuProps } from 'antd';
import { CSSProperties, useRef, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useEvent } from 'react-use';

import { Iconify } from '@/components/icon';
import KanbanTask from '@/pages/sys/others/kanban/kanban-task';
import { Column, DragType, Task, TaskPriority } from '@/pages/sys/others/kanban/types';
import { useSettings } from '@/store/settingStore';

import { ThemeMode } from '#/enum';

type Props = {
  index: number;
  column: Column;
  tasks: Task[];
  createTask: (columnId: string, task: Task) => void;
  clearColumn: (columnId: string) => void;
  deleteColumn: (columnId: string) => void;
  renameColumn: (column: Column) => void;
};

export default function KanbanColumn({
  index,
  column,
  tasks,
  createTask,
  clearColumn,
  deleteColumn,
  renameColumn,
}: Props) {
  const { themeMode } = useSettings();

  const style: CSSProperties = {
    height: '100%',
    padding: '16px',
    borderRadius: '16px',
    backgroundColor:
      themeMode === ThemeMode.Light ? 'rgb(244, 246, 248)' : 'rgba(145, 158, 171, 0.12)',
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div
          className="flex items-center text-gray"
          onClick={() => {
            setRenamingTask(true);
          }}
        >
          <Iconify icon="solar:pen-bold" />
          <span className="ml-2">rename</span>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div className="flex items-center text-gray" onClick={() => clearColumn(column.id)}>
          <Iconify icon="solar:eraser-bold" />
          <span className="ml-2">clear</span>
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div className="flex items-center text-warning" onClick={() => deleteColumn(column.id)}>
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

    if (
      renameTaskInputRef.current &&
      !renameTaskInputRef.current.input?.contains(event.target as Node)
    ) {
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
  useEvent('click', handleClickOutside);

  const [renamingTask, setRenamingTask] = useState(false);
  const renameTaskInputRef = useRef<InputRef>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleMenuItemClick = (menuInfo: any) => {
    setDropdownOpen(false);
    menuInfo.domEvent.stopPropagation();
  };
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <div style={style}>
            <header
              {...provided.dragHandleProps}
              className="mb-4 flex select-none items-center justify-between text-base font-semibold"
            >
              {renamingTask ? (
                <Input ref={renameTaskInputRef} size="large" autoFocus />
              ) : (
                column.title
              )}
              <Dropdown
                open={dropdownOpen}
                onOpenChange={(flag) => setDropdownOpen(flag)}
                menu={{ items, onClick: handleMenuItemClick }}
                placement="bottomRight"
                trigger={['click']}
              >
                <Button shape="circle" type="text" className="!text-gray">
                  <Iconify icon="dashicons:ellipsis" />
                </Button>
              </Dropdown>
            </header>

            <Droppable droppableId={column.id} type={DragType.TASK}>
              {(provided) => (
                <main ref={provided.innerRef} {...provided.droppableProps} className="min-h-[10px]">
                  {tasks.map((task, index) => (
                    <KanbanTask task={task} key={task.id} index={index} />
                  ))}
                  {provided.placeholder}
                </main>
              )}
            </Droppable>

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
        </div>
      )}
    </Draggable>
  );
}
