class AbstractState {
  private readonly effects: (() => void)[];

  public constructor() {
    this.effects = [];
  }

  public addEffect(effect: () => void): void {
    this.effects.push(effect);
  }

  public runEffects(): void {
    this.effects.forEach((effect) => effect());
  }
}

export class Computation<T> extends AbstractState {
  private readonly func: () => T;

  public constructor(func: () => T) {
    super();

    this.func = func;
  }

  public get(): T {
    return this.func();
  }
}

export class State<T> extends AbstractState {
  private readonly computations: Computation<unknown>[];
  private readonly eq?: (a: T, b: T) => boolean;

  private value: T;

  public constructor(value: T, eq?: (a: T, b: T) => boolean) {
    super();

    this.computations = [];
    this.eq = eq;
    this.value = value;
  }

  public addComputation(computation: Computation<unknown>): void {
    this.computations.push(computation);
  }

  public get(): T {
    return this.value;
  }

  public set(value: T): void {
    this.value = value;

    if (!this.eq || this.eq(value, this.value)) {
      this.computations.forEach((computation) => computation.runEffects());
      this.runEffects();
    }
  }
}
