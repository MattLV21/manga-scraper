import type { MangaStatus } from "./types"

export function formatRelativeTime(iso?: string): string {
  if (!iso) return "—"
  const date = new Date(iso)
  const diffMs = Date.now() - date.getTime()
  const diffMin = Math.round(diffMs / 60_000)
  if (diffMin < 1) return "just now"
  if (diffMin < 60) return `${diffMin}m ago`
  const diffHr = Math.round(diffMin / 60)
  if (diffHr < 24) return `${diffHr}h ago`
  const diffDay = Math.round(diffHr / 24)
  if (diffDay < 30) return `${diffDay}d ago`
  const diffMo = Math.round(diffDay / 30)
  if (diffMo < 12) return `${diffMo}mo ago`
  return `${Math.round(diffMo / 12)}y ago`
}

export const statusLabels: Record<MangaStatus, string> = {
  ongoing: "Ongoing",
  completed: "Completed",
  hiatus: "Hiatus",
  cancelled: "Cancelled",
}

export const statusColors: Record<MangaStatus, string> = {
  ongoing: "bg-chart-3/15 text-chart-3 border-chart-3/30",
  completed: "bg-chart-2/15 text-chart-2 border-chart-2/30",
  hiatus: "bg-chart-4/15 text-chart-4 border-chart-4/30",
  cancelled: "bg-destructive/15 text-destructive border-destructive/30",
}

/** Human-readable "unlocks in" label for a locked chapter, e.g. "Unlocks in 3d". */
export function formatUnlockCountdown(iso?: string): string {
  if (!iso) return "Locked"
  const diffMs = new Date(iso).getTime() - Date.now()
  if (diffMs <= 0) return "Unlocking soon"
  const diffMin = Math.round(diffMs / 60_000)
  if (diffMin < 60) return `Unlocks in ${diffMin}m`
  const diffHr = Math.round(diffMin / 60)
  if (diffHr < 24) return `Unlocks in ${diffHr}h`
  const diffDay = Math.round(diffHr / 24)
  return `Unlocks in ${diffDay}d`
}
