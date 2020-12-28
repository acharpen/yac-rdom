import { isNullOrUndefined } from 'util';
import { h } from '../../src/h';
import { R } from '../../src/r';

export const UserForm = () => {
  const firstName = R.state('Dupont');
  const lastName = R.state('Dupond');
  const initials = R.on([firstName, lastName], () =>
    [firstName, lastName]
      .map((state) => state.get()[0])
      .filter(Boolean)
      .join('.')
  );

  const handleChangeFirstName = (event: Event): void => {
    firstName.set((event.target as HTMLInputElement).value ?? '');
  };

  const handleChangeLastName = (event: Event): void => {
    lastName.set((event.target as HTMLInputElement).value ?? '');
  };

  return h(
    'div',
    { class: 'user' },
    h('div', h('span', { class: 'material-icons' }, 'account_circle'), h('div', { class: 'initials' }, initials)),
    h('div', h('div', 'First'), h('input', { value: firstName, change: handleChangeFirstName })),
    h('div', h('div', 'Last'), h('input', { value: lastName, change: handleChangeLastName }))
  );
};
