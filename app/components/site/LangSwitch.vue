<script setup lang="ts">
// Minimal VI / EN toggle. no_prefix strategy → just sets the locale (persisted to cookie).
const { locale, setLocale } = useI18n()
const order = ['vi', 'en'] as const
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
        @click="setLocale(code)"
      >
        {{ code }}
      </button>
    </template>
  </div>
</template>
