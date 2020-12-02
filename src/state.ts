export class State<T> {
  private readonly effects: (() => void)[];

  private target: T;

  public constructor(target: T) {
    this.effects = [];
    this.target = target;
  }

  public addEffect(effect: () => void): void {
    this.effects.push(effect);
  }

  public get(): T {
    return this.target;
  }

  public set(target: T): void {
    this.target = target;

    this.effects.forEach((effect) => effect());
  }
}
