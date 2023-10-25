import { Button } from 'antd';
import { CSSProperties } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { Iconify } from '@/components/icon';
import KanbanTask from '@/pages/sys/others/kanban/kanban-task';
import { Column, Task } from '@/pages/sys/others/kanban/types';
import { useSettings } from '@/store/settingStore';

import { ThemeMode } from '#/enum';

type Props = {
  column: Column;
  tasks: Task[];
};
export default function KanbanColumn({ column, tasks }: Props) {
  const { themeMode } = useSettings();

  const style: CSSProperties = {
    height: '100%',
    padding: '16px',
    borderRadius: '16px',
    backgroundColor:
      themeMode === ThemeMode.Light ? 'rgb(244, 246, 248)' : 'rgba(145, 158, 171, 0.12)',
  };
  return (
    <div style={style}>
      <header className="my-4 text-xl font-bold">{column.title}</header>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <main ref={provided.innerRef} {...provided.droppableProps} className="min-h-[10px]">
            {tasks.map((task, index) => (
              <KanbanTask task={task} key={task.id} index={index} />
            ))}
            {provided.placeholder}
          </main>
        )}
      </Droppable>
      <footer className="w-72">
        <Button
          className="flex items-center"
          type="text"
          block
          size="large"
          icon={<Iconify icon="carbon:add" size={20} />}
        >
          Add Task
        </Button>
      </footer>
    </div>
  );
}
