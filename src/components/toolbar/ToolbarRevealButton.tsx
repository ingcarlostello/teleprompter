import { ChevronUp } from 'lucide-react'
import { formatTooltip } from '@/helpers/format.helpers'

interface ToolbarRevealButtonProps {
  isVisible: boolean
  label: string
  shortcut: string
  onClick: () => void
}

/** Nearly invisible corner button that brings the toolbar back; shows on hover, focus or touch. */
export const ToolbarRevealButton = ({
  isVisible,
  label,
  shortcut,
  onClick,
}: ToolbarRevealButtonProps) =>
  isVisible ? (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={formatTooltip(label, shortcut)}
      className="fixed right-4 bottom-4 z-10 inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-panel-border bg-panel/60 text-ink-muted opacity-0 backdrop-blur-md transition-opacity duration-300 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-accent pointer-coarse:opacity-40"
    >
      <ChevronUp aria-hidden="true" className="size-5" strokeWidth={1.75} />
    </button>
  ) : null
