export type PlaybackStatus = 'idle' | 'playing' | 'paused' | 'finished'

export type ThemeMode = 'soft' | 'contrast'

export interface Script {
  id: string
  title: string
  content: string
  isCustom?: boolean
}

export interface ScriptOption {
  id: string
  label: string
}

export interface ReadingSettings {
  /** Scroll speed in pixels per second. */
  speed: number
  /** Font size in rem. */
  fontSize: number
  /** Reading column width as a percentage of the viewport. */
  width: number
  isMirrored: boolean
  theme: ThemeMode
}

export interface RangeConfig {
  min: number
  max: number
  step: number
  defaultValue: number
}

/** The subset of a wheel event the scroll engine needs; satisfied by both DOM and React events. */
export type WheelInput = Pick<WheelEvent, 'deltaY' | 'deltaMode' | 'ctrlKey'>
