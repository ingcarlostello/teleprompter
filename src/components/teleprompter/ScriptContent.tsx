import type { Ref } from 'react'
import { getFocusAlignedPadding } from '@/helpers/layout.helpers'

interface ScriptContentProps {
  contentRef: Ref<HTMLDivElement>
  paragraphs: readonly string[]
  fontSize: number
  width: number
  placeholder: string
}

const FOCUS_ALIGNED_PADDING = getFocusAlignedPadding()

/** Scrolling text column. Its `transform` is driven imperatively by the scroll engine. */
export const ScriptContent = ({
  contentRef,
  paragraphs,
  fontSize,
  width,
  placeholder,
}: ScriptContentProps) => (
  <div
    ref={contentRef}
    className="mx-auto px-6 font-serif leading-relaxed text-pretty will-change-transform"
    style={{ fontSize: `${fontSize}rem`, width: `${width}%`, ...FOCUS_ALIGNED_PADDING }}
  >
    {paragraphs.length > 0 ? (
      <div className="space-y-[0.75em]">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>
    ) : (
      <p className="text-ink-muted italic">{placeholder}</p>
    )}
  </div>
)
