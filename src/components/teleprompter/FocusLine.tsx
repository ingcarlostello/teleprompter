import { getFocusLineTop } from '@/helpers/layout.helpers'

const FOCUS_LINE_TOP = getFocusLineTop()

/** Subtle eye-line guide placed near the camera so the reader keeps eye contact. */
export const FocusLine = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-x-0 flex -translate-y-1/2 items-center gap-2 px-2"
    style={{ top: FOCUS_LINE_TOP }}
  >
    <span className="size-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-focus" />
    <span className="h-px flex-1 bg-focus" />
    <span className="size-0 border-y-[5px] border-r-[8px] border-y-transparent border-r-focus" />
  </div>
)
