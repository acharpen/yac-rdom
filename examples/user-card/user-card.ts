import { h } from '../../src/h';
import { R } from '../../src/r';

export const UserCard = () => {
  const userFirstName = R.state('Dupont');
  const userFirstNameFirstLetter = R.on([userFirstName], () => userFirstName.get()[0]);
  const userLastName = R.state('Dupond');
  const userLastNameFirstLetter = R.on([userLastName], () => userLastName.get()[0]);

  return h(
    'div',
    { class: 'card' },
    h(
      'div',
      h('span', { class: 'material-icons' }, 'account_circle'),
      h('div', { class: 'initials' }, userFirstNameFirstLetter, '.', userLastNameFirstLetter, '.')
    ),
    h('div', 'First:', userFirstName),
    h('div', 'Last:', userLastName)
  );
};
