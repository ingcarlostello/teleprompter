import type { Dictionary } from '@/types/i18n.types'

export const es = {
  toolbar: {
    label: 'Controles del teleprónter',
  },
  playback: {
    play: 'Reproducir',
    pause: 'Pausar',
    reset: 'Reiniciar desde arriba',
  },
  controls: {
    speed: 'Velocidad',
    fontSize: 'Tamaño de fuente',
    width: 'Ancho',
    script: 'Guion',
  },
  actions: {
    mirror: 'Modo espejo',
    highContrast: 'Alto contraste',
    editScript: 'Editar guion',
    switchLanguage: 'Switch to English',
    hideToolbar: 'Ocultar barra',
    showToolbar: 'Mostrar barra',
  },
  scripts: {
    customTitle: 'Guion personalizado',
    emptyPlaceholder: 'Este guion está vacío. Abre el editor para escribir o pegar el tuyo.',
  },
  editor: {
    title: 'Editar guion',
    description:
      'Los cambios aparecen en el teleprónter mientras escribes. Separa los párrafos con una línea en blanco.',
    placeholder: 'Pega o escribe tu guion aquí…',
    clear: 'Limpiar',
    close: 'Cerrar editor',
  },
} satisfies Dictionary
