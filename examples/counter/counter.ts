import { R } from '../../src/r';
import { h } from '../../src/h';

export const Counter = () => {
  const counter = R.state(0);
  const counterClass = R.on([counter], () => (counter.get() % 2 === 0 ? 'even' : 'odd'));

  setInterval(() => {
    counter.set(counter.get() + 1);
  }, 1000);

  return h('div', { class: counterClass, style: 'font-weight: bold' }, counter);
};
