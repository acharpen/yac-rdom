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
  private readonly derivations: Derivation<any>[];
  private readonly eq?: (a: T, b: T) => boolean;

  private value: T;

  public constructor(value: T, eq?: (a: T, b: T) => boolean) {
    super();

    this.derivations = [];
    this.eq = eq;
    this.value = value;
  }

  public addDerivation(derivation: Derivation<any>): void {
    this.derivations.push(derivation);
  }

  public get(): T {
    return this.value;
  }

  public set(value: T): void {
    if (!this.eq || this.eq(value, this.value)) {
      this.value = value;

      this.derivations.forEach((derivation) => derivation.runEffects());
      this.runEffects();
    }
  }
}

export { Derivation, State };
