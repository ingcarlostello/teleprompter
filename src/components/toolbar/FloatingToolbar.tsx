import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface FloatingToolbarProps {
  isVisible: boolean
  label: string
  children: ReactNode
}

/** Translucent bottom bar. When collapsed it slides away and becomes `inert` (not focusable). */
export const FloatingToolbar = ({ isVisible, label, children }: FloatingToolbarProps) => (
  <div
    role="group"
    aria-label={label}
    inert={!isVisible}
    className={cn(
      'fixed bottom-4 left-1/2 z-10 w-max max-w-[calc(100%-2rem)] -translate-x-1/2 rounded-2xl border border-panel-border bg-panel/60 p-2 shadow-lg shadow-black/30 backdrop-blur-md',
      'transition-[translate,opacity] duration-300 ease-out',
      isVisible
        ? 'translate-y-0 opacity-100'
        : 'pointer-events-none translate-y-[calc(100%+2rem)] opacity-0',
    )}
  >
    <div className="flex flex-wrap items-center justify-center gap-2">{children}</div>
  </div>
)
