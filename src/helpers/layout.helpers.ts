import type { CSSProperties } from 'react'
import { FOCUS_LINE_RATIO, READING_LINE_HEIGHT } from '@/constants/reading.constants'

const toPercent = (ratio: number): number => Number((ratio * 100).toFixed(3))

export const getFocusLineTop = (focusRatio = FOCUS_LINE_RATIO): string =>
  `${toPercent(focusRatio)}%`

/**
 * Padding that centres the first line on the focus line at offset 0 and lets the last line
 * scroll up to it at the maximum offset. Relies on `em`, so apply it to the element that
 * carries the reading font size.
 */
export const getFocusAlignedPadding = (
  focusRatio = FOCUS_LINE_RATIO,
  lineHeight = READING_LINE_HEIGHT,
): Pick<CSSProperties, 'paddingTop' | 'paddingBottom'> => {
  const halfLine = lineHeight / 2
  return {
    paddingTop: `calc(${toPercent(focusRatio)}dvh - ${halfLine}em)`,
    paddingBottom: `calc(${toPercent(1 - focusRatio)}dvh - ${halfLine}em)`,
  }
}
