<script setup lang="ts">
// Minimal VI / EN toggle. no_prefix strategy → just sets the locale; the choice is persisted to
// the `ph-lang` cookie and restored after hydration by plugins/lang-cookie.client.ts.
const { locale, setLocale } = useI18n()
const saved = useCookie<'vi' | 'en' | null>('ph-lang', { maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' })
const order = ['vi', 'en'] as const

function choose(code: (typeof order)[number]) {
  saved.value = code
  setLocale(code)
}
</script>

<template>
  <div class="flex items-center font-mono text-[0.6875rem] uppercase tracking-[0.08em]">
    <template v-for="(code, i) in order" :key="code">
      <span v-if="i > 0" class="px-1 text-border" aria-hidden="true">/</span>
      <button
        type="button"
        class="transition-colors"
        :class="locale === code ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'"
        :aria-pressed="locale === code"
        @click="choose(code)"
      >
        {{ code }}
      </button>
    </template>
  </div>
</template>
