import type { Dictionary } from '@/types/i18n.types'

export const en = {
  toolbar: {
    label: 'Teleprompter controls',
  },
  playback: {
    play: 'Play',
    pause: 'Pause',
    reset: 'Restart from top',
  },
  controls: {
    speed: 'Speed',
    fontSize: 'Font size',
    width: 'Width',
    script: 'Script',
  },
  actions: {
    mirror: 'Mirror mode',
    highContrast: 'High contrast',
    editScript: 'Edit script',
    switchLanguage: 'Cambiar a español',
    hideToolbar: 'Hide toolbar',
    showToolbar: 'Show toolbar',
  },
  scripts: {
    customTitle: 'Custom script',
    emptyPlaceholder: 'This script is empty. Open the editor to write or paste your own.',
  },
  editor: {
    title: 'Edit script',
    description:
      'Changes appear on the teleprompter as you type. Separate paragraphs with a blank line.',
    placeholder: 'Paste or write your script here…',
    clear: 'Clear',
    close: 'Close editor',
  },
} satisfies Dictionary
