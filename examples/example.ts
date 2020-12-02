import { h, render } from '../src/h';
import { createState } from '../src/r';

const counter = createState(73);

const counterClass = createState('bold');

render(
  h(
    'div',
    //
    h('h1', 'Test'),
    h('p', { class: counterClass, 'data-id': 'counter', style: 'color: red' }, counter)
  ),
  document.body
);

setTimeout(() => {
  counter.set(counter.get() + 1);
  counterClass.set([counterClass.get(), 'italic'].join(' '));
}, 1000);
