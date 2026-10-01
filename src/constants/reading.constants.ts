import type { RangeConfig, ReadingSettings } from '@/types/teleprompter.types'

export const SPEED_RANGE: RangeConfig = { min: 10, max: 150, step: 5, defaultValue: 40 }

export const FONT_SIZE_RANGE: RangeConfig = { min: 1.5, max: 5, step: 0.25, defaultValue: 2.75 }

export const WIDTH_RANGE: RangeConfig = { min: 40, max: 100, step: 5, defaultValue: 70 }

export const DEFAULT_READING_SETTINGS: ReadingSettings = {
  speed: SPEED_RANGE.defaultValue,
  fontSize: FONT_SIZE_RANGE.defaultValue,
  width: WIDTH_RANGE.defaultValue,
  isMirrored: false,
  theme: 'soft',
}

/** Upper bound for a single frame's delta, so a throttled or hidden tab never causes a jump. */
export const MAX_FRAME_DELTA_MS = 100

/** Pixels scrolled per "line" when a wheel event reports `DOM_DELTA_LINE` (Firefox). */
export const WHEEL_LINE_HEIGHT_PX = 32

/** Vertical position of the focus line, as a fraction of the viewport height (camera eye-line). */
export const FOCUS_LINE_RATIO = 1 / 3

/** Line height of the reading text; mirrors Tailwind's `leading-relaxed`. */
export const READING_LINE_HEIGHT = 1.625
