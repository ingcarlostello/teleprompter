import type { LucideIcon } from 'lucide-react'
import { useId } from 'react'
import { formatTooltip } from '@/helpers/format.helpers'
import type { RangeConfig } from '@/types/teleprompter.types'

interface RangeControlProps {
  icon: LucideIcon
  label: string
  value: number
  range: RangeConfig
  formatValue: (value: number) => string
  onChange: (value: number) => void
  shortcut?: string
}

export const RangeControl = ({
  icon: Icon,
  label,
  value,
  range,
  formatValue,
  onChange,
  shortcut,
}: RangeControlProps) => {
  const id = useId()
  const formattedValue = formatValue(value)

  return (
    <div className="flex items-center gap-2 px-1" title={formatTooltip(label, shortcut)}>
      <label htmlFor={id} className="flex items-center gap-1.5 text-ink-muted">
        <Icon aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.75} />
        <span className="sr-only text-xs xl:not-sr-only">{label}</span>
      </label>
      <input
        id={id}
        type="range"
        min={range.min}
        max={range.max}
        step={range.step}
        value={value}
        onChange={(event) => onChange(event.currentTarget.valueAsNumber)}
        aria-valuetext={formattedValue}
        className="h-1.5 w-20 cursor-pointer accent-accent sm:w-24"
      />
      <output htmlFor={id} className="w-14 text-xs text-ink tabular-nums">
        {formattedValue}
      </output>
    </div>
  )
}
