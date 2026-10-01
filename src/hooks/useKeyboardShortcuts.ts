import { useEffect, useEffectEvent } from 'react'
import { findShortcut, isBlockedRepeat, isShortcutBlocked } from '@/helpers/shortcuts.helpers'
import type { ShortcutBinding, ShortcutHandlers } from '@/types/shortcut.types'

interface KeyboardShortcutsOptions {
  enabled?: boolean
}

/** Registers global keyboard shortcuts on `window`, stepping aside for focused form controls. */
export const useKeyboardShortcuts = (
  bindings: readonly ShortcutBinding[],
  handlers: ShortcutHandlers,
  { enabled = true }: KeyboardShortcutsOptions = {},
): void => {
  const handleKeyDown = useEffectEvent((event: KeyboardEvent) => {
    const binding = findShortcut(event, bindings)
    if (!binding || isShortcutBlocked(event)) return

    event.preventDefault()
    if (isBlockedRepeat(event, binding)) return
    handlers[binding.action]()
  })

  // Buttons activate on key release; cancelling it prevents Space from also "clicking" a focused button.
  const handleKeyUp = useEffectEvent((event: KeyboardEvent) => {
    if (findShortcut(event, bindings) && !isShortcutBlocked(event)) event.preventDefault()
  })

  useEffect(() => {
    if (!enabled) return

    const onKeyDown = (event: KeyboardEvent) => handleKeyDown(event)
    const onKeyUp = (event: KeyboardEvent) => handleKeyUp(event)

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [enabled])
}
