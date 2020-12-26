import { h } from '../../src/h';
import { R } from '../../src/r';
import { State } from '../../src/state';

export const Todo = (item: State<{ title: string }>, onRemove: (item: State<{ title: string }>) => void) => {
  const title = R.on([item], () => item.get().title);

  const handleRemove = () => {
    onRemove(item);
  };

  return h('li', h('input', { value: title }), h('button', { click: handleRemove }, '-'));
};
