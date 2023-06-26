import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Select, Input, Button } from 'antd';
import { useState } from 'react';

import todoService, { Todo } from '@/services/todoService';

const useTodos = () => {
  //  查询
  const query = useQuery<Todo[], Error>({
    queryKey: ['todos'],
    queryFn: todoService.getTodos,
  });
  return query;
};

const useAddTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Todo, Error, Todo>({
    mutationFn: todoService.addTodo,
    /**
     * @param variables 提交数据
     * @returns 返回上下文，将作为onError / onSuccess / onSettled 的 context
     */
    onMutate: (variables) => {
      // 修改即将发生！
      console.group('onMutate');
      console.log(variables);
      console.groupEnd();
      console.log(variables);
      // （可选）返回上下文
      return { id: 1 };
    },
    /**
     * @param error 失败返回数据
     * @param variables 提交数据
     * @param context 上下文
     */
    onError: (error, variables, context) => {
      // 错误触发！
      console.group('onError');
      console.log(error, variables, context);
      console.groupEnd();
    },
    /**
     * @param data 成功反回数据
     * @param variables 提交数据
     * @param context 上下文
     */
    onSuccess: (data, variables, context) => {
      // 成功触发
      console.group('onSuccess');
      console.log(data, variables, context);
      console.groupEnd();
      queryClient.setQueryData<Todo[]>(['todos'], (old) => [
        { ...data, ...variables },
        ...(old || []),
      ]);
    },
    onSettled: (data, error, variables, context) => {
      // 错误或成功……都触发
      console.group('onSettled');
      console.log(data, error, variables, context);
      console.groupEnd();
    },
  });
  return mutation;
};

function ReactQuery() {
  const [selectedState, setSelectedState] = useState<boolean | ''>('');
  const [inputTodo, setInputTodo] = useState('');

  const { data: todos, isLoading, error } = useTodos();
  const mutation = useAddTodo();

  const submit = () => {
    mutation.mutate({
      title: inputTodo,
      userId: 123,
      id: Math.floor(1000 + Math.random() * 100),
      completed: false,
    });
  };

  // 加载处理
  if (isLoading) return <p>loading...</p>;
  // 异常处理
  if (error) return <p>{error.message}</p>;
  if (mutation.error) return <p>{mutation.error.message}</p>;

  return (
    <div>
      <div className="flex w-full">
        <Input value={inputTodo} onChange={(e) => setInputTodo(e.target.value)} />
        <Button onClick={submit}>Submit</Button>
      </div>
      <Select className="w-full" value={selectedState} onChange={setSelectedState}>
        <Select.Option value="">所有</Select.Option>
        <Select.Option value="true">已完成</Select.Option>
        <Select.Option value="false">未完成</Select.Option>
      </Select>
      <ul>
        {todos?.map((todo) => (
          <li className="m-2 flex items-center rounded-sm border border-blue-700 p-2" key={todo.id}>
            <div className="w-12 p-2">{todo.completed ? <span>[✔️]</span> : <span>[×]</span>}</div>
            <span>{todo.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReactQuery;
