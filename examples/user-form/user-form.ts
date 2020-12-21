import { h } from '../../src/h';
import { R } from '../../src/r';

export const UserForm = () => {
  const firstName = R.state('Dupont');
  const firstNameFirstLetter = R.on([firstName], () => firstName.get()[0]);
  const lastName = R.state('Dupond');
  const lastNameFirstLetter = R.on([lastName], () => lastName.get()[0]);

  const handleChangeOnFirstName = (event: Event): void => {
    firstName.set((event.target as HTMLInputElement).value);
  };

  const handleChangeOnLastName = (event: Event): void => {
    lastName.set((event.target as HTMLInputElement).value);
  };

  return h(
    'div',
    { class: 'user' },
    h(
      'div',
      h('span', { class: 'material-icons' }, 'account_circle'),
      h('div', { class: 'initials' }, firstNameFirstLetter, '.', lastNameFirstLetter, '.')
    ),
    h('div', h('div', 'First'), h('input', { value: firstName, change: handleChangeOnFirstName })),
    h('div', h('div', 'Last'), h('input', { value: lastName, change: handleChangeOnLastName }))
  );
};
