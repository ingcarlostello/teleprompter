import { useCallback, useEffectEvent, useLayoutEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import {
  computeNextOffset,
  getMaxOffset,
  hasReachedEnd,
  normalizeWheelDelta,
  rescaleOffset,
  toTranslateY,
} from '@/helpers/scroll.helpers'
import { useAnimationFrame } from '@/hooks/useAnimationFrame'
import type { PlaybackStatus, WheelInput } from '@/types/teleprompter.types'
import { clamp } from '@/utils/math'

interface AutoScrollOptions {
  /** Scroll speed in px/s. Read on every frame, so changes apply without restarting. */
  speed: number
  /** Must change whenever typography or column width changes; progress is then kept proportionally. */
  layoutKey: string
}

interface MeasuredLayout {
  layoutKey: string
  viewportWidth: number
  viewportHeight: number
}

export interface AutoScrollControls {
  status: PlaybackStatus
  isPlaying: boolean
  viewportRef: RefObject<HTMLDivElement | null>
  contentRef: RefObject<HTMLDivElement | null>
  play: () => void
  pause: () => void
  toggle: () => void
  reset: () => void
  handleWheel: (event: WheelInput) => void
}

const isSameLayout = (a: MeasuredLayout, b: MeasuredLayout): boolean =>
  a.layoutKey === b.layoutKey &&
  a.viewportWidth === b.viewportWidth &&
  a.viewportHeight === b.viewportHeight

/**
 * Teleprompter scroll engine. The offset lives in a ref and is written straight to the content's
 * `transform` (sub-pixel, compositor-only, no React re-render per frame), advanced by
 * `speed × deltaTime` on each animation frame so motion is identical at any refresh rate.
 */
export const useAutoScroll = ({ speed, layoutKey }: AutoScrollOptions): AutoScrollControls => {
  const viewportRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const maxOffsetRef = useRef(0)
  const measuredLayoutRef = useRef<MeasuredLayout>({
    layoutKey,
    viewportWidth: 0,
    viewportHeight: 0,
  })
  const [status, setStatus] = useState<PlaybackStatus>('idle')
  const isPlaying = status === 'playing'

  const applyOffset = useCallback((offset: number) => {
    offsetRef.current = offset
    const content = contentRef.current
    if (content) content.style.transform = toTranslateY(offset)
  }, [])

  /** Leaves the `finished` state once there is text below the focus line again. */
  const releaseFinished = useCallback((offset: number, maxOffset: number) => {
    if (hasReachedEnd(offset, maxOffset)) return
    setStatus((current) => (current === 'finished' ? 'paused' : current))
  }, [])

  useAnimationFrame((deltaMs) => {
    const maxOffset = maxOffsetRef.current
    const nextOffset = computeNextOffset(offsetRef.current, speed, deltaMs, maxOffset)
    applyOffset(nextOffset)
    if (hasReachedEnd(nextOffset, maxOffset)) setStatus('finished')
  }, isPlaying)

  const syncMaxOffset = useEffectEvent(() => {
    const content = contentRef.current
    const viewport = viewportRef.current
    if (!content || !viewport) return

    const measured: MeasuredLayout = {
      layoutKey,
      viewportWidth: viewport.clientWidth,
      viewportHeight: viewport.clientHeight,
    }
    const isLayoutChange = !isSameLayout(measuredLayoutRef.current, measured)
    const previousMax = maxOffsetRef.current
    const nextMax = getMaxOffset(content.offsetHeight, measured.viewportHeight)

    measuredLayoutRef.current = measured
    maxOffsetRef.current = nextMax

    // Typography/viewport changes keep the reading position proportionally; text edits only clamp,
    // so typing in the editor never makes the prompter jump.
    const nextOffset = isLayoutChange
      ? rescaleOffset(offsetRef.current, previousMax, nextMax)
      : clamp(offsetRef.current, 0, nextMax)

    applyOffset(nextOffset)
    releaseFinished(nextOffset, nextMax)
  })

  useLayoutEffect(() => {
    const content = contentRef.current
    const viewport = viewportRef.current
    if (!content || !viewport) return

    syncMaxOffset()
    const observer = new ResizeObserver(() => syncMaxOffset())
    observer.observe(content)
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [])

  const play = useCallback(() => {
    if (status === 'finished') applyOffset(0)
    setStatus('playing')
  }, [status, applyOffset])

  const pause = useCallback(() => {
    setStatus((current) => (current === 'playing' ? 'paused' : current))
  }, [])

  const toggle = useCallback(() => (isPlaying ? pause() : play()), [isPlaying, pause, play])

  const reset = useCallback(() => {
    applyOffset(0)
    setStatus('idle')
  }, [applyOffset])

  const handleWheel = useCallback(
    (event: WheelInput) => {
      if (event.ctrlKey) return // browser zoom gesture

      const pageHeight = viewportRef.current?.clientHeight ?? window.innerHeight
      const maxOffset = maxOffsetRef.current
      const nextOffset = clamp(
        offsetRef.current + normalizeWheelDelta(event, pageHeight),
        0,
        maxOffset,
      )
      applyOffset(nextOffset)
      releaseFinished(nextOffset, maxOffset)
    },
    [applyOffset, releaseFinished],
  )

  return { status, isPlaying, viewportRef, contentRef, play, pause, toggle, reset, handleWheel }
}
