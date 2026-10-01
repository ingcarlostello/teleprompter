import { WHEEL_LINE_HEIGHT_PX } from '@/constants/reading.constants'
import { clamp } from '@/utils/math'

const MS_PER_SECOND = 1000

/** Advances the offset by `speed` px/s over `deltaMs`, never leaving the [0, maxOffset] range. */
export const computeNextOffset = (
  offset: number,
  speed: number,
  deltaMs: number,
  maxOffset: number,
): number => clamp(offset + (speed * deltaMs) / MS_PER_SECOND, 0, maxOffset)

export const getMaxOffset = (contentHeight: number, viewportHeight: number): number =>
  Math.max(0, contentHeight - viewportHeight)

/** Keeps the same relative reading progress when the scrollable distance changes. */
export const rescaleOffset = (offset: number, previousMax: number, nextMax: number): number =>
  previousMax > 0 ? clamp((offset / previousMax) * nextMax, 0, nextMax) : 0

export const hasReachedEnd = (offset: number, maxOffset: number): boolean => offset >= maxOffset

/** Converts a wheel delta to pixels regardless of the browser's reporting unit. */
export const normalizeWheelDelta = (
  { deltaY, deltaMode }: Pick<WheelEvent, 'deltaY' | 'deltaMode'>,
  pageHeight: number,
): number => {
  if (deltaMode === WheelEvent.DOM_DELTA_LINE) return deltaY * WHEEL_LINE_HEIGHT_PX
  if (deltaMode === WheelEvent.DOM_DELTA_PAGE) return deltaY * pageHeight
  return deltaY
}

export const toTranslateY = (offset: number): string => `translate3d(0, ${-offset}px, 0)`
