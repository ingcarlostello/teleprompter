import type { RangeConfig, ThemeMode } from '@/types/teleprompter.types'
import { clamp, snapToStep } from '@/utils/math'

export type StepDirection = 1 | -1

/** Snaps a value to the range's step grid and keeps it within its bounds. */
export const fitToRange = (value: number, { min, max, step }: RangeConfig): number =>
  clamp(snapToStep(value, step, min), min, max)

export const stepInRange = (value: number, range: RangeConfig, direction: StepDirection): number =>
  fitToRange(value + direction * range.step, range)

export const toggleThemeMode = (theme: ThemeMode): ThemeMode =>
  theme === 'soft' ? 'contrast' : 'soft'
