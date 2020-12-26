/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import '@testing-library/jest-dom/extend-expect';
import { h, render } from '../h';
import { R } from '../r';
import { getByTestId } from '@testing-library/dom';

// ////////////////////////////////////////////////////////////////////////////
// Setup
// ////////////////////////////////////////////////////////////////////////////

const counter = R.state(73);
const counterClass = R.state('bold');

render(document.body, h('div', { class: counterClass, 'data-testid': 'counter', style: 'font-weight: 600' }, counter));

// ////////////////////////////////////////////////////////////////////////////
// Tests
// ////////////////////////////////////////////////////////////////////////////

test('counter element reacts after update', () => {
  const containerElt = getByTestId(document.body, 'counter');

  expect(containerElt).toBeValid();
  expect(containerElt).toBeVisible();
  expect(containerElt).toHaveClass('bold', { exact: true });
  expect(containerElt).toHaveStyle({ 'font-weight': 600 });
  expect(containerElt).toHaveTextContent('73');

  counter.set(counter.get() + 1);
  counterClass.set([counterClass.get(), 'italic'].join(' '));

  expect(containerElt).toHaveClass('bold italic', { exact: true });
  expect(containerElt).toHaveTextContent('74');
});
