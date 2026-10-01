const TEXT_INPUT_TYPES = new Set(['text', 'search', 'email', 'url', 'tel', 'password', 'number'])

const asElement = (target: EventTarget | null): HTMLElement | null =>
  target instanceof HTMLElement ? target : null

export const isTextEditable = (target: EventTarget | null): boolean => {
  const element = asElement(target)
  if (!element) return false
  if (element.isContentEditable || element instanceof HTMLTextAreaElement) return true
  return element instanceof HTMLInputElement && TEXT_INPUT_TYPES.has(element.type)
}

export const isSelect = (target: EventTarget | null): boolean => target instanceof HTMLSelectElement

export const isRangeInput = (target: EventTarget | null): boolean =>
  target instanceof HTMLInputElement && target.type === 'range'

export const isButton = (target: EventTarget | null): boolean => target instanceof HTMLButtonElement
