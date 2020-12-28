import { Derivation, State, StateArray } from './state';

function createDerivation<T>(states: State<any>[], func: () => T): Derivation<T> {
  const derivation = new Derivation<T>(func);

  states.forEach((state) => state.addDerivation(derivation));

  return derivation;
}

function createState<T>(val: T): State<T> {
  return new State<T>(val);
}

function createStateArray<T>(val: T[]): StateArray<T> {
  return new StateArray<T>(val);
}

export const R = {
  on: createDerivation,
  state: createState,
  stateArray: createStateArray
};
