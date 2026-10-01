# Teleprompter

Teleprónter minimalista para entrevistas técnicas y videollamadas. Mantén la vista en la línea de enfoque (a un tercio de la altura, cerca de la cámara) mientras el guion se desplaza de forma continua.

## Comandos

```bash
pnpm install     # dependencias
pnpm dev         # servidor de desarrollo en http://localhost:5173
pnpm build       # typecheck + build de producción en dist/
pnpm preview     # sirve el build
pnpm lint        # oxlint
pnpm typecheck   # tsc -b
pnpm format      # prettier (ordena también las clases de Tailwind)
```

## Atajos de teclado

| Tecla       | Acción                            |
| ----------- | --------------------------------- |
| `Space`     | Reproducir / pausar               |
| `↑` / `↓`   | Subir / bajar velocidad (±5 px/s) |
| `R`         | Reiniciar desde arriba            |
| `H`         | Ocultar / mostrar la barra        |
| Rueda ratón | Avanzar / retroceder manualmente  |
| `Esc`       | Cerrar el editor de guion         |

Los atajos se desactivan mientras escribes en el editor, y ceden las flechas a los sliders y al selector cuando tienen el foco.

## Funcionalidades

- **Motor de scroll** con `requestAnimationFrame` y delta time: velocidad idéntica a 60, 120 o 144 Hz, desplazamiento subpíxel vía `translate3d` (sin re-renders de React por frame) y delta acotado para evitar saltos al volver de una pestaña oculta.
- **Línea de enfoque** al 33 %: la primera línea arranca centrada en ella y la última termina en ella.
- **Fades** superior e inferior con `mask-image`.
- **Tipografía** Georgia con `leading-relaxed`; sliders de tamaño (rem) y ancho de columna (%). Al cambiarlos a mitad de lectura se conserva la posición relativa.
- **Modo espejo** (`scaleX(-1)`) para cristales de teleprónter y **alto contraste** (ámbar sobre negro puro).
- **Editor lateral** (`<dialog>` nativo) para escribir o pegar guiones en vivo. Los cambios viven solo en memoria.
- **Interfaz bilingüe** EN/ES; los guiones predefinidos están en inglés.

## Arquitectura

```
src/
├── App.tsx              # raíz de composición: conecta el view model con los componentes
├── components/          # 100 % presentacionales (solo props)
│   ├── teleprompter/    # viewport enmascarado, texto, línea de enfoque
│   ├── toolbar/         # barra flotante y sus controles
│   ├── editor/          # sheet de edición
│   └── ui/              # piezas reutilizables (IconButton)
├── hooks/               # lógica de negocio
│   ├── useTeleprompter  # fachada: compone los hooks y expone el view model
│   ├── useAutoScroll    # motor de desplazamiento
│   ├── useAnimationFrame, useKeyboardShortcuts, useDialog, useToggle  # genéricos
│   └── useReadingSettings, useScripts, useLanguage                    # dominio
├── helpers/             # funciones puras de dominio (scroll, layout, atajos, formato…)
├── utils/               # funciones puras genéricas (clamp, cn, dom, idioma)
├── constants/           # rangos, atajos y valores por defecto
├── types/               # tipos compartidos
├── i18n/                # diccionarios en / es
└── data/                # guiones predefinidos
```

Stack: React 19 · TypeScript · Vite · Tailwind CSS v4 · lucide-react.
