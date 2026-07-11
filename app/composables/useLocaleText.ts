import { computed } from 'vue'
import type { LocaleText, Locale } from '@/data/site'

// Resolve a bilingual { vi, en } value against the active i18n locale.
export function useLocaleText() {
  const { locale } = useI18n()
  const lt = (text: LocaleText) => text[(locale.value as Locale)] ?? text.vi
  const current = computed(() => locale.value as Locale)
  return { lt, locale: current }
}
