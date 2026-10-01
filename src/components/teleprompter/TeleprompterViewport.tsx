import type { ReactNode, Ref } from 'react'
import type { WheelInput } from '@/types/teleprompter.types'
import { cn } from '@/utils/cn'

interface TeleprompterViewportProps {
  viewportRef: Ref<HTMLDivElement>
  isMirrored: boolean
  onWheel: (event: WheelInput) => void
  children: ReactNode
}

/**
 * Full-screen reading area. The fade mask lives on a background-less layer so only the text
 * fades; mirroring is applied on a wrapper so it never conflicts with the scroll transform.
 */
export const TeleprompterViewport = ({
  viewportRef,
  isMirrored,
  onWheel,
  children,
}: TeleprompterViewportProps) => (
  <div ref={viewportRef} onWheel={onWheel} className="absolute inset-0 overflow-hidden mask-fade-y">
    <div
      className={cn(
        'h-full transition-transform duration-500 ease-out',
        isMirrored && '[transform:scaleX(-1)]',
      )}
    >
      {children}
    </div>
  </div>
)
