import { Derivation, State, StateArray } from './state';

function createDerivation<T>(states: State<any>[], func: () => T): Derivation<T> {
  const derivation = new Derivation<T>(func);

  states.forEach((state) => state.addDerivation(derivation));

  return derivation;
}

function createState<T>(val: T, eq?: (value: T) => (othValue: T) => boolean): State<T> {
  return new State<T>(val, eq);
}

function createStateArray<T>(val: T[], eq?: (item: T, othItem: T) => boolean): StateArray<T> {
  return new StateArray<T>(val, eq);
}

export const R = {
  on: createDerivation,
  state: createState,
  stateArray: createStateArray
};
