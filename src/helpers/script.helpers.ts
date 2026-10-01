import type { Script, ScriptOption } from '@/types/teleprompter.types'

/** Splits text on blank lines; single line breaks stay inside their paragraph. */
export const splitIntoParagraphs = (content: string): string[] =>
  content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

export const isScriptEmpty = (script: Script): boolean => script.content.trim().length === 0

export const toScriptOptions = (scripts: readonly Script[], customTitle: string): ScriptOption[] =>
  scripts.map(({ id, title, isCustom }) => ({ id, label: isCustom ? customTitle : title }))

export const replaceScriptContent = (
  scripts: readonly Script[],
  id: string,
  content: string,
): Script[] => scripts.map((script) => (script.id === id ? { ...script, content } : script))
