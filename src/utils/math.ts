export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max)

/** Rounds `value` to the nearest multiple of `step` counted from `origin`, avoiding float drift. */
export const snapToStep = (value: number, step: number, origin = 0): number => {
  const snapped = Math.round((value - origin) / step) * step + origin
  return Number(snapped.toFixed(4))
}
