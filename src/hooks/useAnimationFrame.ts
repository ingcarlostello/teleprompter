import { useEffect, useEffectEvent } from 'react'
import { MAX_FRAME_DELTA_MS } from '@/constants/reading.constants'

/**
 * Runs `onFrame` on every animation frame while `isRunning` is true, passing the elapsed
 * time since the previous frame. The first frame after (re)starting only records a timestamp,
 * so resuming never produces a jump; deltas are capped to survive throttled or hidden tabs.
 */
export const useAnimationFrame = (
  onFrame: (deltaMs: number) => void,
  isRunning: boolean,
  maxDeltaMs = MAX_FRAME_DELTA_MS,
): void => {
  const handleFrame = useEffectEvent(onFrame)

  useEffect(() => {
    if (!isRunning) return

    let frameId = 0
    let lastTimestamp: number | null = null

    const loop = (timestamp: number) => {
      if (lastTimestamp !== null) {
        handleFrame(Math.min(timestamp - lastTimestamp, maxDeltaMs))
      }
      lastTimestamp = timestamp
      frameId = requestAnimationFrame(loop)
    }

    frameId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frameId)
  }, [isRunning, maxDeltaMs])
}
