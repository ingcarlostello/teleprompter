import type { ShortcutBinding } from '@/types/shortcut.types'
import { isRangeInput, isSelect, isTextEditable } from '@/utils/dom'

const VERTICAL_ARROW_CODES = new Set(['ArrowUp', 'ArrowDown'])

export const matchesShortcut = (event: KeyboardEvent, binding: ShortcutBinding): boolean => {
  if (binding.code) return event.code === binding.code
  if (binding.key) return event.key.toLowerCase() === binding.key
  return false
}

export const findShortcut = (
  event: KeyboardEvent,
  bindings: readonly ShortcutBinding[],
): ShortcutBinding | undefined => bindings.find((binding) => matchesShortcut(event, binding))

const hasModifier = (event: KeyboardEvent): boolean =>
  event.ctrlKey || event.metaKey || event.altKey

/** Whether the focused element handles this key natively, so the global shortcut must stand aside. */
const isKeyOwnedByTarget = ({ target, code }: KeyboardEvent): boolean => {
  if (isTextEditable(target)) return true
  if (isSelect(target)) return code === 'Space' || VERTICAL_ARROW_CODES.has(code)
  if (isRangeInput(target)) return VERTICAL_ARROW_CODES.has(code)
  return false
}

export const isShortcutBlocked = (event: KeyboardEvent): boolean =>
  event.isComposing || hasModifier(event) || isKeyOwnedByTarget(event)

export const isBlockedRepeat = (event: KeyboardEvent, binding: ShortcutBinding): boolean =>
  event.repeat && !binding.allowRepeat
