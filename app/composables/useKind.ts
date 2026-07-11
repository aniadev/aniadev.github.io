// Maps a writing `kind` to its accent color + i18n label key.
// security = forensic red, protocol = teal, engineering = violet, ai = amber, note = neutral.
export type Kind = 'security' | 'protocol' | 'engineering' | 'ai' | 'note'

const COLOR: Record<Kind, string> = {
  security: 'var(--color-security)',
  protocol: 'var(--color-protocol)',
  engineering: 'var(--color-engineering)',
  ai: 'var(--color-ai)',
  note: 'var(--color-muted-foreground, #6a6a70)',
}

export function useKind() {
  const { t } = useI18n()
  const color = (k: Kind) => COLOR[k] ?? COLOR.note
  const label = (k: Kind) => t(`kind.${k}`)
  return { color, label }
}
