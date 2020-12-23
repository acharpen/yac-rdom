import { Derivation, State } from './state';

function createDerivation<T>(states: State<any>[], func: () => T): Derivation<T> {
  const derivation = new Derivation(func);

  states.forEach((state) => state.addDerivation(derivation));

  return derivation;
}

function createState<T>(val: T): State<T> {
  return new State(val);
}

export const R = {
  on: createDerivation,
  state: createState
};
