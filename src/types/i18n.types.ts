export type Language = 'en' | 'es'

export interface Dictionary {
  toolbar: {
    label: string
  }
  playback: {
    play: string
    pause: string
    reset: string
  }
  controls: {
    speed: string
    fontSize: string
    width: string
    script: string
  }
  actions: {
    mirror: string
    highContrast: string
    editScript: string
    switchLanguage: string
    hideToolbar: string
    showToolbar: string
  }
  scripts: {
    customTitle: string
    emptyPlaceholder: string
  }
  editor: {
    title: string
    description: string
    placeholder: string
    clear: string
    close: string
  }
}
