import type { ShortcutAction, ShortcutBinding } from '@/types/shortcut.types'

export const SHORTCUT_BINDINGS: readonly ShortcutBinding[] = [
  { action: 'togglePlayback', code: 'Space', label: 'Space', allowRepeat: false },
  { action: 'speedUp', code: 'ArrowUp', label: '↑', allowRepeat: true },
  { action: 'speedDown', code: 'ArrowDown', label: '↓', allowRepeat: true },
  { action: 'reset', key: 'r', label: 'R', allowRepeat: false },
  { action: 'toggleToolbar', key: 'h', label: 'H', allowRepeat: false },
]

export const SHORTCUT_LABELS = Object.fromEntries(
  SHORTCUT_BINDINGS.map(({ action, label }) => [action, label]),
) as Record<ShortcutAction, string>
