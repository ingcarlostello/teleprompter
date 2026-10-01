import { Pause, Play, RotateCcw } from 'lucide-react'
import { IconButton } from '@/components/ui/IconButton'
import { SHORTCUT_LABELS } from '@/constants/shortcuts.constants'
import type { Dictionary } from '@/types/i18n.types'

interface PlaybackControlsProps {
  labels: Dictionary['playback']
  isPlaying: boolean
  canPlay: boolean
  onTogglePlayback: () => void
  onReset: () => void
}

export const PlaybackControls = ({
  labels,
  isPlaying,
  canPlay,
  onTogglePlayback,
  onReset,
}: PlaybackControlsProps) => (
  <div className="flex items-center gap-1">
    <IconButton
      variant="primary"
      icon={isPlaying ? Pause : Play}
      label={isPlaying ? labels.pause : labels.play}
      shortcut={SHORTCUT_LABELS.togglePlayback}
      onClick={onTogglePlayback}
      disabled={!canPlay && !isPlaying}
    />
    <IconButton
      icon={RotateCcw}
      label={labels.reset}
      shortcut={SHORTCUT_LABELS.reset}
      onClick={onReset}
    />
  </div>
)
