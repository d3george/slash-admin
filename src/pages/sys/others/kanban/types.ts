export type Task = {
  id: string;
  content: string;
};
export type Tasks = Record<string, Task>;

export type Column = {
  id: string;
  title: string;
  taskIds: string[];
};
export type Columns = Record<string, Column>;

export type DndDataType = {
  tasks: Tasks;
  columns: Columns;
  columnOrder: string[];
};

export enum DragType {
  COLUMN = 'column',
  TASK = 'task',
}
