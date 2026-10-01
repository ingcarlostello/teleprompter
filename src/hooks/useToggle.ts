import { useCallback, useState } from 'react'

export interface ToggleState {
  value: boolean
  toggle: () => void
  setTrue: () => void
  setFalse: () => void
}

export const useToggle = (initialValue = false): ToggleState => {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => setValue((current) => !current), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])

  return { value, toggle, setTrue, setFalse }
}
