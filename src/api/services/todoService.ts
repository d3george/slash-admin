import apiClient from '../apiClient';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

enum Api {
  Todos = '/todos',
}

const getTodos = () => apiClient.get({ url: Api.Todos });
const addTodo = (params: Todo) => apiClient.post({ url: Api.Todos, params });

export default {
  getTodos,
  addTodo,
};
