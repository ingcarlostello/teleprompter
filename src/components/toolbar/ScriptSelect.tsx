import { FileText } from 'lucide-react'
import { useId } from 'react'
import type { ScriptOption } from '@/types/teleprompter.types'

interface ScriptSelectProps {
  label: string
  options: readonly ScriptOption[]
  value: string
  onChange: (id: string) => void
}

export const ScriptSelect = ({ label, options, value, onChange }: ScriptSelectProps) => {
  const id = useId()

  return (
    <div className="flex items-center gap-2 px-1">
      <label htmlFor={id} title={label} className="text-ink-muted">
        <FileText aria-hidden="true" className="size-4" strokeWidth={1.75} />
        <span className="sr-only">{label}</span>
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
        className="h-9 max-w-52 cursor-pointer truncate rounded-xl border border-panel-border bg-transparent px-2 text-sm text-ink transition-colors hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id} className="bg-panel text-ink">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
