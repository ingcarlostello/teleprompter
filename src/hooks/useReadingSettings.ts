import { useCallback, useState } from 'react'
import {
  DEFAULT_READING_SETTINGS,
  FONT_SIZE_RANGE,
  SPEED_RANGE,
  WIDTH_RANGE,
} from '@/constants/reading.constants'
import { fitToRange, stepInRange, toggleThemeMode } from '@/helpers/settings.helpers'
import type { StepDirection } from '@/helpers/settings.helpers'
import type { ReadingSettings } from '@/types/teleprompter.types'

export interface ReadingSettingsControls {
  settings: ReadingSettings
  setSpeed: (speed: number) => void
  increaseSpeed: () => void
  decreaseSpeed: () => void
  setFontSize: (fontSize: number) => void
  setWidth: (width: number) => void
  toggleMirror: () => void
  toggleTheme: () => void
}

export const useReadingSettings = (
  initialSettings: ReadingSettings = DEFAULT_READING_SETTINGS,
): ReadingSettingsControls => {
  const [settings, setSettings] = useState(initialSettings)

  const patch = useCallback((changes: Partial<ReadingSettings>) => {
    setSettings((current) => ({ ...current, ...changes }))
  }, [])

  const setSpeed = useCallback(
    (speed: number) => patch({ speed: fitToRange(speed, SPEED_RANGE) }),
    [patch],
  )

  const stepSpeed = useCallback((direction: StepDirection) => {
    setSettings((current) => ({
      ...current,
      speed: stepInRange(current.speed, SPEED_RANGE, direction),
    }))
  }, [])

  const increaseSpeed = useCallback(() => stepSpeed(1), [stepSpeed])
  const decreaseSpeed = useCallback(() => stepSpeed(-1), [stepSpeed])

  const setFontSize = useCallback(
    (fontSize: number) => patch({ fontSize: fitToRange(fontSize, FONT_SIZE_RANGE) }),
    [patch],
  )

  const setWidth = useCallback(
    (width: number) => patch({ width: fitToRange(width, WIDTH_RANGE) }),
    [patch],
  )

  const toggleMirror = useCallback(() => {
    setSettings((current) => ({ ...current, isMirrored: !current.isMirrored }))
  }, [])

  const toggleTheme = useCallback(() => {
    setSettings((current) => ({ ...current, theme: toggleThemeMode(current.theme) }))
  }, [])

  return {
    settings,
    setSpeed,
    increaseSpeed,
    decreaseSpeed,
    setFontSize,
    setWidth,
    toggleMirror,
    toggleTheme,
  }
}
