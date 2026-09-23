// Every non-draft post is listed in both locales: posts in the active locale come first, the
// rest follow (each group keeps the incoming date order) and carry a language badge in PostRow.
export function usePostOrder() {
  const { locale } = useI18n()
  const order = <T extends { lang?: string; draft?: boolean }>(posts: T[] | null | undefined) => {
    const live = (posts ?? []).filter((p) => !p.draft)
    return [...live.filter((p) => p.lang === locale.value), ...live.filter((p) => p.lang !== locale.value)]
  }
  return { order }
}
