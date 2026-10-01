export type ShortcutAction = 'togglePlayback' | 'speedUp' | 'speedDown' | 'reset' | 'toggleToolbar'

export interface ShortcutBinding {
  action: ShortcutAction
  /** Matched against `KeyboardEvent.code` (layout-independent keys such as Space or arrows). */
  code?: string
  /** Matched against `KeyboardEvent.key`, case-insensitive (letters that follow the user's layout). */
  key?: string
  /** Label shown in tooltips. */
  label: string
  /** Whether holding the key down should keep triggering the action. */
  allowRepeat: boolean
}

export type ShortcutHandlers = Record<ShortcutAction, () => void>
