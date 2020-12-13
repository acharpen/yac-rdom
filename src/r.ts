import { Computation, State } from './state';

function createComputation<T>(states: State<unknown>[], func: () => T): Computation<T> {
  const computation = new Computation(func);

  states.forEach((state) => state.addComputation(computation));

  return computation;
}

function createState<T>(val: T): State<T> {
  return new State(val);
}

export const R = {
  on: createComputation,
  state: createState
};
