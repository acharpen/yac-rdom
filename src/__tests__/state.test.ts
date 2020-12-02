import { State } from '../state';
import { createState } from '../r';

// ////////////////////////////////////////////////////////////////////////////
// Setup
// ////////////////////////////////////////////////////////////////////////////

const numberState = createState(73);
const stringState = createState('foo');

// ////////////////////////////////////////////////////////////////////////////
// Tests
// ////////////////////////////////////////////////////////////////////////////

describe('checking state of number', () => {
  test('numberState is a State instance', () => {
    expect(numberState instanceof State).toBeTruthy();
  });

  test("numberState's value is a number", () => {
    expect(typeof numberState.get()).toStrictEqual('number');
  });

  test("numberState's value is '73'", () => {
    expect(numberState.get()).toEqual(73);
  });
});

describe('checking state of string', () => {
  test('stringState is a State instance', () => {
    expect(stringState instanceof State).toBeTruthy();
  });

  test("stringState's value is a string", () => {
    expect(typeof stringState.get()).toStrictEqual('string');
  });

  test("stringState's value is 'foo'", () => {
    expect(stringState.get()).toEqual('foo');
  });
});
