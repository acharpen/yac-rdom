import { State } from './state';

function createState<T>(object: T): State<T> {
  return new State(object);
}

export { createState };
