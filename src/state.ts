class Derivation<T> {
  private readonly effects: (() => void)[];
  private readonly func: () => T;

  public constructor(func: () => T) {
    this.effects = [];
    this.func = func;
  }

  public addEffect(effect: () => void): void {
    this.effects.push(effect);
  }

  public get(): T {
    return this.func();
  }

  public runEffects(): void {
    this.effects.forEach((effect) => effect());
  }
}

class AbstractState<T> {
  protected readonly derivations: Derivation<any>[];

  protected value: T;

  public constructor(value: T) {
    this.derivations = [];
    this.value = value;
  }

  public addDerivation(derivation: Derivation<any>): void {
    this.derivations.push(derivation);
  }

  public get(): T {
    return this.value;
  }
}

class State<T> extends AbstractState<T> {
  private readonly effects: (() => void)[];
  private readonly eq: ((othValue: T) => boolean) | undefined;

  public constructor(value: T, eq?: (value: T) => (othValue: T) => boolean) {
    super(value);

    this.effects = [];
    this.eq = eq?.(this.value);
  }

  public addEffect(effect: () => void): void {
    this.effects.push(effect);
  }

  public isEqual(othState: State<T>): boolean {
    return this.eq?.(othState.get()) ?? this.value === othState.get();
  }

  public set(newValue: T): void {
    const oldValue = this.value;

    this.value = newValue;

    if (!this.eq || !this.eq(oldValue)) {
      this.effects.forEach((effect) => effect());
      this.derivations.forEach((derivation) => derivation.runEffects());
    }
  }
}

class StateArray<T> extends AbstractState<T[]> {
  private readonly effectsOnAdd: ((idx: number, item: T) => void)[];
  private readonly effectsOnRemove: ((idx: number) => void)[];
  private readonly eq: ((item: T, othItem: T) => boolean) | undefined;

  public constructor(value: T[], eq?: (item: T, othItem: T) => boolean) {
    super(value);

    this.effectsOnAdd = [];
    this.effectsOnRemove = [];
    this.eq = eq;
  }

  public add(itemToAdd: T, itemToAddIdx?: number): void {
    this.value.push(itemToAdd);

    this.effectsOnAdd.forEach((effect) => effect(itemToAddIdx ?? this.value.length, itemToAdd));
    this.derivations.forEach((derivation) => derivation.runEffects());
  }

  public addEffectOnAdd(effect: (idx: number, item: T) => void): void {
    this.effectsOnAdd.push(effect);
  }

  public addEffectOnRemove(effect: (idx: number) => void): void {
    this.effectsOnRemove.push(effect);
  }

  public remove(itemToRemove: T): void {
    const eq = this.eq ?? ((item, othItem): boolean => item === othItem);
    const itemToRemoveIdx = this.value.findIndex((item) => eq(item, itemToRemove));

    this.value.splice(itemToRemoveIdx, 1);

    this.effectsOnRemove.forEach((effect) => effect(itemToRemoveIdx));
    this.derivations.forEach((derivation) => derivation.runEffects());
  }
}

export { Derivation, State, StateArray };
