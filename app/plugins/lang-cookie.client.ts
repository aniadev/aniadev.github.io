// Restores a manually chosen locale (cookie `ph-lang`, written by LangSwitch) once hydration is
// finished. Applying it any earlier diverges from the `vi` prerendered HTML and Vue reports a
// hydration mismatch.
export default defineNuxtPlugin((nuxtApp) => {
  const saved = useCookie<'vi' | 'en' | null>('ph-lang')
  onNuxtReady(() => {
    const i18n = nuxtApp.$i18n as any
    if (saved.value && saved.value !== i18n.locale.value) i18n.setLocale(saved.value)
  })
})
