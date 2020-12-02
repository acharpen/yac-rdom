import { State } from './state';

type ElementAttrs = Record<string, string | State<string>>;
type ElementChildNode = (() => HTMLElement) | number | string | State<number> | State<string>;
type ElementParams = [ElementAttrs, ...ElementChildNode[]] | [...ElementChildNode[]];

function appendChildNodes(childNodes: ElementChildNode[], elt: HTMLElement): void {
  for (let i = 0, len = childNodes.length; i < len; i++) {
    const childNode = childNodes[i];

    if (typeof childNode === 'function') {
      elt.appendChild(childNode());
    } else if (typeof childNode === 'number' || typeof childNode === 'string') {
      elt.appendChild(document.createTextNode(childNode.toString()));
    } else {
      const textNode = document.createTextNode(childNode.get().toString());

      elt.appendChild(textNode);

      childNode.addEffect(() => {
        textNode.nodeValue = childNode.get().toString();
      });
    }
  }
}

function setAttributes(attrs: ElementAttrs, elt: HTMLElement): void {
  for (const [key, val] of Object.entries(attrs)) {
    if (typeof val === 'string') {
      elt.setAttribute(key, val);
    } else {
      elt.setAttribute(key, val.get());

      val.addEffect(() => {
        elt.setAttribute(key, val.get());
      });
    }
  }
}

function h(tag: string, ...params: ElementParams): () => HTMLElement {
  return (): HTMLElement => {
    let attrs: ElementAttrs;
    let childNodes: ElementChildNode[];
    if (!params.length) {
      attrs = {};
      childNodes = [];
    } else if (
      typeof params[0] === 'function' ||
      typeof params[0] === 'number' ||
      typeof params[0] === 'string' ||
      params[0] instanceof State
    ) {
      attrs = {};
      childNodes = params as ElementChildNode[];
    } else {
      attrs = params[0];
      childNodes = params.slice(1) as ElementChildNode[];
    }

    const elt = document.createElement(tag);
    appendChildNodes(childNodes, elt);
    setAttributes(attrs, elt);

    return elt;
  };
}

function render(factory: () => HTMLElement, container: HTMLElement): void {
  container.appendChild(factory());
}

export { h, render };
