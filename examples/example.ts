import { h, render } from '../src/h';
import { R } from '../src/r';

const counter = R.state(73);
const counterClass = R.state('bold');

const userFirstName = R.state('Dupont');
const userFirstNameFirstLetter = R.on([userFirstName], () => userFirstName.get()[0]);
const userLastName = R.state('Dupond');
const userLastNameFirstLetter = R.on([userLastName], () => userLastName.get()[0]);

render(
  h(
    'div',
    //
    h('h1', 'Test'),
    h('p', { class: counterClass, style: 'color: red' }, counter),
    h(
      'div',
      //
      h('div', userFirstNameFirstLetter, userLastNameFirstLetter),
      h('div', userFirstName),
      h('div', userLastName)
    )
  ),
  document.body
);

setInterval(() => {
  counter.set(counter.get() + 1);
}, 1000);

setTimeout(() => {
  counterClass.set([counterClass.get(), 'italic'].join(' '));

  userFirstName.set('Capitaine');
  userLastName.set('Haddock');
}, 1000);
