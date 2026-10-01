import { useCallback, useEffect, useRef } from 'react'
import type { MouseEvent, RefObject } from 'react'

export interface DialogControls<TFocus extends HTMLElement> {
  dialogRef: RefObject<HTMLDialogElement | null>
  initialFocusRef: RefObject<TFocus | null>
  handleBackdropClick: (event: MouseEvent<HTMLDialogElement>) => void
}

/**
 * Keeps a native modal `<dialog>` in sync with `isOpen`. The native dialog provides focus
 * trapping, Escape handling and the backdrop; the dialog's `close` event must call `onClose`.
 */
export const useDialog = <TFocus extends HTMLElement = HTMLElement>(
  isOpen: boolean,
  onClose: () => void,
): DialogControls<TFocus> => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const initialFocusRef = useRef<TFocus>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && !dialog.open) {
      dialog.showModal()
      initialFocusRef.current?.focus()
    } else if (!isOpen && dialog.open) {
      dialog.close()
    }
  }, [isOpen])

  // A click whose target is the dialog itself landed on the backdrop, outside the content box.
  const handleBackdropClick = useCallback(
    (event: MouseEvent<HTMLDialogElement>) => {
      if (event.target === event.currentTarget) onClose()
    },
    [onClose],
  )

  return { dialogRef, initialFocusRef, handleBackdropClick }
}
