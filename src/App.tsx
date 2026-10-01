import {
  ChevronDown,
  Contrast,
  Gauge,
  Languages,
  MoveHorizontal,
  SquarePen,
  TrianglesCenterlineDashedHorizontal,
  Type,
} from 'lucide-react'
import { ScriptEditorSheet } from '@/components/editor/ScriptEditorSheet'
import { FocusLine } from '@/components/teleprompter/FocusLine'
import { ScriptContent } from '@/components/teleprompter/ScriptContent'
import { TeleprompterViewport } from '@/components/teleprompter/TeleprompterViewport'
import { FloatingToolbar } from '@/components/toolbar/FloatingToolbar'
import { PlaybackControls } from '@/components/toolbar/PlaybackControls'
import { RangeControl } from '@/components/toolbar/RangeControl'
import { ScriptSelect } from '@/components/toolbar/ScriptSelect'
import { ToolbarDivider } from '@/components/toolbar/ToolbarDivider'
import { ToolbarRevealButton } from '@/components/toolbar/ToolbarRevealButton'
import { IconButton } from '@/components/ui/IconButton'
import { FONT_SIZE_RANGE, SPEED_RANGE, WIDTH_RANGE } from '@/constants/reading.constants'
import { SHORTCUT_LABELS } from '@/constants/shortcuts.constants'
import { formatFontSize, formatSpeed, formatWidth } from '@/helpers/format.helpers'
import { useTeleprompter } from '@/hooks/useTeleprompter'

const SPEED_SHORTCUT = `${SHORTCUT_LABELS.speedUp}/${SHORTCUT_LABELS.speedDown}`

export default function App() {
  const { theme, labels, stage, playback, reading, scripts, language, toolbar, editor } =
    useTeleprompter()

  return (
    <main
      data-theme={theme}
      className="relative h-dvh w-full overflow-hidden bg-surface text-ink transition-colors duration-300"
    >
      {/* Rendered below the text layer so the guide never crosses over the letters. */}
      <FocusLine />

      <TeleprompterViewport
        viewportRef={stage.viewportRef}
        isMirrored={stage.isMirrored}
        onWheel={stage.onWheel}
      >
        <ScriptContent
          contentRef={stage.contentRef}
          paragraphs={stage.paragraphs}
          fontSize={stage.fontSize}
          width={stage.width}
          placeholder={labels.scripts.emptyPlaceholder}
        />
      </TeleprompterViewport>

      <FloatingToolbar isVisible={toolbar.isVisible} label={labels.toolbar.label}>
        <PlaybackControls
          labels={labels.playback}
          isPlaying={playback.isPlaying}
          canPlay={playback.canPlay}
          onTogglePlayback={playback.onTogglePlayback}
          onReset={playback.onReset}
        />

        <ToolbarDivider />

        <RangeControl
          icon={Gauge}
          label={labels.controls.speed}
          value={reading.speed}
          range={SPEED_RANGE}
          formatValue={formatSpeed}
          onChange={reading.onSpeedChange}
          shortcut={SPEED_SHORTCUT}
        />
        <RangeControl
          icon={Type}
          label={labels.controls.fontSize}
          value={reading.fontSize}
          range={FONT_SIZE_RANGE}
          formatValue={formatFontSize}
          onChange={reading.onFontSizeChange}
        />
        <RangeControl
          icon={MoveHorizontal}
          label={labels.controls.width}
          value={reading.width}
          range={WIDTH_RANGE}
          formatValue={formatWidth}
          onChange={reading.onWidthChange}
        />

        <ToolbarDivider />

        <ScriptSelect
          label={labels.controls.script}
          options={scripts.options}
          value={scripts.activeId}
          onChange={scripts.onSelect}
        />

        <ToolbarDivider />

        <div className="flex items-center gap-1">
          <IconButton
            icon={TrianglesCenterlineDashedHorizontal}
            label={labels.actions.mirror}
            isActive={reading.isMirrored}
            onClick={reading.onToggleMirror}
          />
          <IconButton
            icon={Contrast}
            label={labels.actions.highContrast}
            isActive={reading.isHighContrast}
            onClick={reading.onToggleTheme}
          />
          <IconButton icon={SquarePen} label={labels.actions.editScript} onClick={editor.onOpen} />
          <IconButton
            icon={Languages}
            label={labels.actions.switchLanguage}
            onClick={language.onToggle}
          >
            {language.code}
          </IconButton>
        </div>

        <ToolbarDivider />

        <IconButton
          icon={ChevronDown}
          label={labels.actions.hideToolbar}
          shortcut={SHORTCUT_LABELS.toggleToolbar}
          onClick={toolbar.onToggle}
        />
      </FloatingToolbar>

      <ToolbarRevealButton
        isVisible={!toolbar.isVisible}
        label={labels.actions.showToolbar}
        shortcut={SHORTCUT_LABELS.toggleToolbar}
        onClick={toolbar.onToggle}
      />

      <ScriptEditorSheet
        labels={labels.editor}
        scriptTitle={editor.scriptTitle}
        content={editor.content}
        dialogRef={editor.dialogRef}
        initialFocusRef={editor.initialFocusRef}
        onBackdropClick={editor.handleBackdropClick}
        onClose={editor.onClose}
        onContentChange={editor.onContentChange}
        onClear={editor.onClear}
      />
    </main>
  )
}
