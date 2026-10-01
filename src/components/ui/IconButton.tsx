import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { formatTooltip } from '@/helpers/format.helpers'
import { cn } from '@/utils/cn'

type IconButtonVariant = 'ghost' | 'primary'

interface IconButtonProps {
  icon: LucideIcon
  label: string
  onClick: () => void
  shortcut?: string
  /** When defined, the button behaves as a toggle and exposes `aria-pressed`. */
  isActive?: boolean
  disabled?: boolean
  variant?: IconButtonVariant
  children?: ReactNode
}

const VARIANT_CLASSES: Record<IconButtonVariant, string> = {
  ghost: 'text-ink-muted hover:bg-ink/10 hover:text-ink',
  primary: 'bg-accent text-surface hover:brightness-110',
}

export const IconButton = ({
  icon: Icon,
  label,
  onClick,
  shortcut,
  isActive,
  disabled = false,
  variant = 'ghost',
  children,
}: IconButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={label}
    aria-pressed={isActive}
    title={formatTooltip(label, shortcut)}
    className={cn(
      'inline-flex h-9 min-w-9 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-xl px-2 text-xs font-semibold tracking-wide transition-[color,background-color,filter] duration-200',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
      'disabled:cursor-not-allowed disabled:opacity-40',
      VARIANT_CLASSES[variant],
      isActive && 'bg-accent/15 text-accent hover:bg-accent/25 hover:text-accent',
    )}
  >
    <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.75} />
    {children}
  </button>
)
