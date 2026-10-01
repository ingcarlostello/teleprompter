export const formatSpeed = (pxPerSecond: number): string => `${pxPerSecond} px/s`

export const formatFontSize = (rem: number): string => `${rem.toFixed(2)} rem`

export const formatWidth = (percent: number): string => `${percent}%`

export const formatTooltip = (label: string, shortcut?: string): string =>
  shortcut ? `${label} (${shortcut})` : label
