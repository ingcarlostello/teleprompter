import { Eraser, X } from 'lucide-react'
import { useId } from 'react'
import type { MouseEvent, Ref } from 'react'
import { IconButton } from '@/components/ui/IconButton'
import type { Dictionary } from '@/types/i18n.types'

interface ScriptEditorSheetProps {
  labels: Dictionary['editor']
  scriptTitle: string
  content: string
  dialogRef: Ref<HTMLDialogElement>
  initialFocusRef: Ref<HTMLTextAreaElement>
  onBackdropClick: (event: MouseEvent<HTMLDialogElement>) => void
  onClose: () => void
  onContentChange: (content: string) => void
  onClear: () => void
}

/** Side sheet built on a native modal `<dialog>` (focus trap, Escape and backdrop for free). */
export const ScriptEditorSheet = ({
  labels,
  scriptTitle,
  content,
  dialogRef,
  initialFocusRef,
  onBackdropClick,
  onClose,
  onContentChange,
  onClear,
}: ScriptEditorSheetProps) => {
  const titleId = useId()
  const descriptionId = useId()

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onClose={onClose}
      onClick={onBackdropClick}
      className="editor-sheet"
    >
      <div className="flex h-full flex-col gap-4 p-5">
        <header className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 id={titleId} className="text-base font-semibold text-ink">
              {labels.title}
            </h2>
            <p className="mt-0.5 truncate text-sm text-ink-muted">{scriptTitle}</p>
          </div>
          <IconButton icon={X} label={labels.close} onClick={onClose} />
        </header>

        <textarea
          ref={initialFocusRef}
          name="script"
          value={content}
          onChange={(event) => onContentChange(event.currentTarget.value)}
          placeholder={labels.placeholder}
          aria-label={labels.title}
          spellCheck
          className="min-h-0 flex-1 resize-none rounded-xl border border-panel-border bg-surface/70 p-4 font-serif text-base leading-relaxed text-ink placeholder:text-ink-muted/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />

        <footer className="flex items-center justify-between gap-4">
          <p id={descriptionId} className="text-xs leading-snug text-ink-muted">
            {labels.description}
          </p>
          <button
            type="button"
            onClick={onClear}
            disabled={content.length === 0}
            className="inline-flex h-9 shrink-0 cursor-pointer items-center gap-2 rounded-xl border border-panel-border px-3 text-sm text-ink transition-colors hover:bg-ink/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Eraser aria-hidden="true" className="size-4" strokeWidth={1.75} />
            {labels.clear}
          </button>
        </footer>
      </div>
    </dialog>
  )
}
