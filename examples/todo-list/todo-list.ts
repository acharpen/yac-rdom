import { h } from '../../src/h';
import { R } from '../../src/r';
import { State } from '../../src/state';
import { Todo } from './todo';

export const TodoList = () => {
  const nextTodoTitle = R.state('');
  const todoList = R.stateArray([]);

  const handleAddTodo = () => {
    todoList.add(R.state({ title: nextTodoTitle.get() }));

    nextTodoTitle.set('');
  };

  const handleChangeNextTodoTitle = (event: Event): void => {
    nextTodoTitle.set((event.target as HTMLInputElement).value);
  };

  const handleRemoveTodo = (todo: State<{ title: string }>) => {
    todoList.remove(todo);
  };

  return [
    h(
      'div',
      h('input', { value: nextTodoTitle, change: handleChangeNextTodoTitle }),
      h('button', { click: handleAddTodo }, '+')
    ),
    h('ul', [todoList, (todo: State<{ title: string }>) => Todo(todo, handleRemoveTodo)])
  ];
};
