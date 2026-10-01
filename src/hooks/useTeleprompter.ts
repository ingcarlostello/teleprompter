import { useCallback, useMemo } from 'react'
import { SHORTCUT_BINDINGS } from '@/constants/shortcuts.constants'
import { isScriptEmpty, splitIntoParagraphs, toScriptOptions } from '@/helpers/script.helpers'
import { useAutoScroll } from '@/hooks/useAutoScroll'
import { useDialog } from '@/hooks/useDialog'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import { useLanguage } from '@/hooks/useLanguage'
import { useReadingSettings } from '@/hooks/useReadingSettings'
import { useScripts } from '@/hooks/useScripts'
import { useToggle } from '@/hooks/useToggle'
import { LANGUAGE_LABELS } from '@/i18n/dictionaries'

/**
 * Facade that wires the teleprompter's hooks together (script selection resets the scroll,
 * shortcuts drive playback and settings) and exposes a view model grouped by UI area.
 */
export const useTeleprompter = () => {
  const { language, labels, toggleLanguage } = useLanguage()
  const {
    settings,
    setSpeed,
    increaseSpeed,
    decreaseSpeed,
    setFontSize,
    setWidth,
    toggleMirror,
    toggleTheme,
  } = useReadingSettings()
  const { scripts, activeScript, selectScript, updateActiveContent, clearActiveContent } =
    useScripts()
  const toolbar = useToggle(true)
  const editor = useToggle(false)
  const { isPlaying, viewportRef, contentRef, toggle, reset, handleWheel } = useAutoScroll({
    speed: settings.speed,
    layoutKey: `${settings.fontSize}:${settings.width}`,
  })
  const dialog = useDialog<HTMLTextAreaElement>(editor.value, editor.setFalse)

  const canPlay = !isScriptEmpty(activeScript)
  const paragraphs = useMemo(
    () => splitIntoParagraphs(activeScript.content),
    [activeScript.content],
  )
  const scriptOptions = useMemo(
    () => toScriptOptions(scripts, labels.scripts.customTitle),
    [scripts, labels.scripts.customTitle],
  )

  const activeScriptTitle =
    scriptOptions.find(({ id }) => id === activeScript.id)?.label ?? activeScript.title

  const handleSelectScript = useCallback(
    (id: string) => {
      selectScript(id)
      reset()
    },
    [selectScript, reset],
  )

  const togglePlayback = useCallback(() => {
    if (canPlay || isPlaying) toggle()
  }, [canPlay, isPlaying, toggle])

  useKeyboardShortcuts(
    SHORTCUT_BINDINGS,
    {
      togglePlayback,
      speedUp: increaseSpeed,
      speedDown: decreaseSpeed,
      reset,
      toggleToolbar: toolbar.toggle,
    },
    { enabled: !editor.value },
  )

  return {
    theme: settings.theme,
    labels,
    stage: {
      viewportRef,
      contentRef,
      onWheel: handleWheel,
      isMirrored: settings.isMirrored,
      paragraphs,
      fontSize: settings.fontSize,
      width: settings.width,
    },
    playback: {
      isPlaying,
      canPlay,
      onTogglePlayback: togglePlayback,
      onReset: reset,
    },
    reading: {
      speed: settings.speed,
      fontSize: settings.fontSize,
      width: settings.width,
      isMirrored: settings.isMirrored,
      isHighContrast: settings.theme === 'contrast',
      onSpeedChange: setSpeed,
      onFontSizeChange: setFontSize,
      onWidthChange: setWidth,
      onToggleMirror: toggleMirror,
      onToggleTheme: toggleTheme,
    },
    scripts: {
      options: scriptOptions,
      activeId: activeScript.id,
      onSelect: handleSelectScript,
    },
    language: {
      code: LANGUAGE_LABELS[language],
      onToggle: toggleLanguage,
    },
    toolbar: {
      isVisible: toolbar.value,
      onToggle: toolbar.toggle,
    },
    editor: {
      isOpen: editor.value,
      onOpen: editor.setTrue,
      onClose: editor.setFalse,
      scriptTitle: activeScriptTitle,
      content: activeScript.content,
      onContentChange: updateActiveContent,
      onClear: clearActiveContent,
      ...dialog,
    },
  }
}

export type TeleprompterViewModel = ReturnType<typeof useTeleprompter>
