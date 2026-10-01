import { useCallback, useState } from 'react'
import { PREDEFINED_SCRIPTS } from '@/data/predefinedScripts'
import { replaceScriptContent } from '@/helpers/script.helpers'
import type { Script } from '@/types/teleprompter.types'

export interface ScriptsControls {
  scripts: readonly Script[]
  activeScript: Script
  selectScript: (id: string) => void
  updateActiveContent: (content: string) => void
  clearActiveContent: () => void
}

/** In-memory script library; edits live only for the current session. */
export const useScripts = (
  initialScripts: readonly Script[] = PREDEFINED_SCRIPTS,
): ScriptsControls => {
  const [scripts, setScripts] = useState(initialScripts)
  const [activeId, setActiveId] = useState(initialScripts[0].id)

  const activeScript = scripts.find((script) => script.id === activeId) ?? scripts[0]

  const selectScript = useCallback((id: string) => setActiveId(id), [])

  const updateActiveContent = useCallback(
    (content: string) => setScripts((current) => replaceScriptContent(current, activeId, content)),
    [activeId],
  )

  const clearActiveContent = useCallback(() => updateActiveContent(''), [updateActiveContent])

  return { scripts, activeScript, selectScript, updateActiveContent, clearActiveContent }
}
