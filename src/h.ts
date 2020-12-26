import { Derivation, State, StateArray } from './state';

type ElementAttrs = Record<
  string,
  | boolean
  | number
  | string
  | Derivation<boolean>
  | Derivation<number>
  | Derivation<string>
  | State<boolean>
  | State<number>
  | State<string>
  | ((event: Event) => void)
>;
type ElementValue =
  | (() => HTMLElement)
  | number
  | string
  | Derivation<number>
  | Derivation<string>
  | State<number>
  | State<string>
  | [StateArray<any>, (state: State<any>) => () => HTMLElement];
type ElementParams = [ElementAttrs, ...ElementValue[]] | [...ElementValue[]];

function appendValues(values: ElementValue[], elt: HTMLElement): void {
  for (let i = 0, len = values.length; i < len; i++) {
    const value = values[i];

    if (Array.isArray(value)) {
      const [items, gen] = value;

      items.get().forEach((item) => elt.appendChild(gen(item)()));

      items.addEffectOnAdd((idx, item) => {
        if (idx >= items.get().length) {
          elt.appendChild(gen(item)());
        } else {
          elt.insertBefore(gen(item)(), elt.childNodes[idx]);
        }
      });
      items.addEffectOnRemove((idx) => elt.removeChild(elt.children[idx]));
    } else if (typeof value === 'function') {
      elt.appendChild(value());
    } else if (typeof value === 'number' || typeof value === 'string') {
      elt.appendChild(document.createTextNode(value.toString()));
    } else {
      const textNode = document.createTextNode(value.get().toString());

      elt.appendChild(textNode);

      value.addEffect(() => (textNode.nodeValue = value.get().toString()));
    }
  }
}

function setAttributes(attrs: ElementAttrs, elt: HTMLElement): void {
  for (const [key, value] of Object.entries(attrs)) {
    if (typeof value === 'function') {
      elt.addEventListener(key, value);
    } else if (typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string') {
      elt.setAttribute(key, value.toString());
    } else {
      if (elt instanceof HTMLInputElement || elt instanceof HTMLSelectElement || elt instanceof HTMLTextAreaElement) {
        elt.value = value.get().toString();

        value.addEffect(() => (elt.value = value.get().toString()));
      } else {
        elt.setAttribute(key, value.get().toString());

        value.addEffect(() => elt.setAttribute(key, value.get().toString()));
      }
    }
  }
}

function h(tag: string, ...params: ElementParams): () => HTMLElement {
  return (): HTMLElement => {
    let attrs: ElementAttrs;
    let values: ElementValue[];
    if (!params.length) {
      attrs = {};
      values = [];
    } else if (
      Array.isArray(params[0]) ||
      typeof params[0] === 'function' ||
      typeof params[0] === 'number' ||
      typeof params[0] === 'string' ||
      params[0] instanceof Derivation ||
      params[0] instanceof State
    ) {
      attrs = {};
      values = params as ElementValue[];
    } else {
      attrs = params[0];
      values = params.slice(1) as ElementValue[];
    }

    const elt = document.createElement(tag);
    appendValues(values, elt);
    setAttributes(attrs, elt);

    return elt;
  };
}

function render(container: HTMLElement, ...gens: [...(() => HTMLElement)[]]): void {
  gens.map((gen) => container.appendChild(gen()));
}

export { h, render };
