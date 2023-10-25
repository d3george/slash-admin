import { CSSProperties } from 'react';
import { Droppable } from 'react-beautiful-dnd';

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
          <main ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <KanbanTask task={task} key={task.id} index={index} />
            ))}
            {provided.placeholder}
          </main>
        )}
      </Droppable>
    </div>
  );
}
