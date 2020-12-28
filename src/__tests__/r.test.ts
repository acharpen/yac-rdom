/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import '@testing-library/jest-dom/extend-expect';
import { getByTestId, queryAllByTestId } from '@testing-library/dom';
import { h, render } from '../h';
import { R } from '../r';
import { State } from '../state';

describe('counter', () => {
  // ////////////////////////////////////////////////////////////////////////////
  // Setup
  // ////////////////////////////////////////////////////////////////////////////
  const counter = R.state(73);
  const counterClass = R.state('bold');

  render(
    document.body,
    h('div', { class: counterClass, 'data-testid': 'counter', style: 'font-weight: 600' }, counter)
  );

  const elt = getByTestId(document.body, 'counter');

  // ////////////////////////////////////////////////////////////////////////////
  // Tests
  // ////////////////////////////////////////////////////////////////////////////
  test('counter element initializes correctly', () => {
    expect(elt).toBeValid();
    expect(elt).toBeVisible();
    expect(elt).toHaveClass('bold', { exact: true });
    expect(elt).toHaveStyle({ 'font-weight': 600 });
    expect(elt).toHaveTextContent('73');
  });

  test('counter element reacts after update', () => {
    counter.set(counter.get() + 1);
    counterClass.set([counterClass.get(), 'italic'].join(' '));

    expect(elt).toHaveClass('bold italic', { exact: true });
    expect(elt).toHaveTextContent('74');
  });
});

describe('todo-list', () => {
  // ////////////////////////////////////////////////////////////////////////////
  // Setup
  // ////////////////////////////////////////////////////////////////////////////
  const Todo = (item: State<{ title: string }>): (() => HTMLElement) => {
    const title = R.on([item], () => item.get().title);

    return h('li', { 'data-testid': 'todo' }, title);
  };

  const todoList = R.stateArray(
    [R.state({ title: 'avocado' })],
    (todo, othTodo) => todo.get().title === othTodo.get().title
  );

  render(
    document.body,
    h('ul', { 'data-testid': 'todo-list' }, [
      todoList,
      (todo: State<{ title: string }>): (() => HTMLElement) => Todo(todo)
    ])
  );

  const elt = getByTestId(document.body, 'todo-list');

  // ////////////////////////////////////////////////////////////////////////////
  // Tests
  // ////////////////////////////////////////////////////////////////////////////
  test('todo-list element initializes correctly', () => {
    expect(queryAllByTestId(elt, 'todo')).toHaveLength(1);
    expect(getByTestId(elt, 'todo')).toHaveTextContent('avocado');
  });

  test('todo-list element reacts after adding an item', () => {
    todoList.add(R.state({ title: 'banana' }));

    expect(queryAllByTestId(elt, 'todo')).toHaveLength(2);
  });

  test('todo-list element reacts after removing an item', () => {
    todoList.remove(R.state({ title: 'avocado' }));

    expect(queryAllByTestId(elt, 'todo')).toHaveLength(1);
  });

  test('first todo-list element reacts after update', () => {
    todoList.get()[0].set({ title: 'apple' });

    expect(getByTestId(elt, 'todo')).toHaveTextContent('apple');
  });
});
