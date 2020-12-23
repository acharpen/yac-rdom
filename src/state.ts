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

class Derivation<T> extends AbstractState {
  private readonly func: () => T;

  public constructor(func: () => T) {
    super();

    this.func = func;
  }

  public get(): T {
    return this.func();
  }
}

class State<T> extends AbstractState {
  private readonly derivations: Derivation<unknown>[];
  private readonly eq?: (a: T, b: T) => boolean;

  private value: T;

  public constructor(value: T, eq?: (a: T, b: T) => boolean) {
    super();

    this.derivations = [];
    this.eq = eq;
    this.value = value;
  }

  public addDerivation(derivation: Derivation<unknown>): void {
    this.derivations.push(derivation);
  }

  public get(): T {
    return this.value;
  }

  public set(value: T): void {
    this.value = value;

    if (!this.eq || this.eq(value, this.value)) {
      this.derivations.forEach((derivation) => derivation.runEffects());
      this.runEffects();
    }
  }
}

class StateArray<T> extends State<T> {
  public constructor(value: T, eq?: (a: T, b: T) => boolean) {
    super(value, eq);
  }
}

export { Derivation, State, StateArray };
