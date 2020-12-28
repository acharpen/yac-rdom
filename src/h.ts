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
  | [StateArray<any>, (state: State<any>) => () => HTMLElement]
  | number
  | string
  | Derivation<number>
  | Derivation<string>
  | State<number>
  | State<string>;

function appendValues(values: ElementValue[], elt: HTMLElement): void {
  for (let i = 0, len = values.length; i < len; i++) {
    const value = values[i];

    if (typeof value === 'function') {
      elt.appendChild(value());
    } else if (typeof value === 'number' || typeof value === 'string') {
      elt.appendChild(document.createTextNode(value.toString()));
    } else if (Array.isArray(value)) {
      const [items, func] = value;

      items.get().forEach((item) => elt.appendChild(func(item)()));

      items.effectsOnAdd.push((idx, item) => {
        if (idx >= items.get().length) {
          elt.appendChild(func(item)());
        } else {
          elt.insertBefore(func(item)(), elt.childNodes[idx]);
        }
      });
      items.effectsOnRemove.push((idx) => elt.removeChild(elt.children[idx]));
    } else {
      const textNode = document.createTextNode(value.get().toString());

      elt.appendChild(textNode);

      value.effects.push(() => (textNode.nodeValue = value.get().toString()));
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

        value.effects.push(() => (elt.value = value.get().toString()));
      } else {
        elt.setAttribute(key, value.get().toString());

        value.effects.push(() => elt.setAttribute(key, value.get().toString()));
      }
    }
  }
}

function h(tag: string, ...params: [ElementAttrs, ...ElementValue[]] | [...ElementValue[]]): () => HTMLElement {
  return (): HTMLElement => {
    let attrs: ElementAttrs;
    let values: ElementValue[];
    if (!params.length) {
      attrs = {};
      values = [];
    } else if (
      typeof params[0] === 'function' ||
      typeof params[0] === 'number' ||
      typeof params[0] === 'string' ||
      Array.isArray(params[0]) ||
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

function render(container: HTMLElement, ...funcs: [...(() => HTMLElement)[]]): void {
  funcs.map((func) => container.appendChild(func()));
}

export { h, render };
