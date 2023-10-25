import { CSSProperties } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { Task } from '@/pages/sys/others/kanban/types';
import { useSettings } from '@/store/settingStore';

import { ThemeMode } from '#/enum';

type Props = {
  index: number;
  task: Task;
};

export default function KanbanTask({ index, task }: Props) {
  const { themeMode } = useSettings();

  const style: CSSProperties = {
    backgroundColor: themeMode === ThemeMode.Light ? '#fff' : 'rgb(22, 28, 36)',
    boxShadow:
      themeMode === ThemeMode.Light
        ? 'rgba(145, 158, 171, 0.16) 0px 1px 2px 0px'
        : 'rgba(0, 0, 0, 0.16) 0px 1px 2px 0px',
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          $isDragging={snapshot.isDragging}
          $themeMode={themeMode}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  );
}

const Container = styled.div<{ $isDragging: boolean; $themeMode: ThemeMode }>`
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  font-weight: 500;
  background-color: ${(props) => {
    if (props.$themeMode === ThemeMode.Light) {
      return props.$isDragging ? 'rgba(255, 255, 255, 0.68)' : 'rgb(255, 255, 255)';
    }
    return props.$isDragging ? 'rgba(22, 28, 36, 0.48)' : 'rgb(22, 28, 36)';
  }};
  backdrop-filter: ${(props) => (props.$isDragging ? `blur(6px)` : '')};

  &:hover {
    box-shadow: ${(props) =>
      props.$themeMode === ThemeMode.Light
        ? 'rgba(145, 158, 171, 0.16) 0px 20px 40px -4px'
        : 'rgba(0, 0, 0, 0.16) 0px 20px 40px -4px'};
  }
`;
