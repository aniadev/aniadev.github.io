<script setup lang="ts">
// MDC block for annotated posts:  ::callout{type="danger" title="Root cause"} … ::
// Kept quiet — a left rule + small mono label, no fills except a faint tint.
const props = withDefaults(
  defineProps<{ type?: 'note' | 'insight' | 'warning' | 'danger'; title?: string }>(),
  { type: 'note' },
)

const MAP = {
  note: { icon: 'lucide:info', color: 'var(--color-signal)', tint: 'var(--color-signal-soft)' },
  insight: { icon: 'lucide:lightbulb', color: 'var(--color-protocol)', tint: 'color-mix(in srgb, var(--color-protocol) 8%, transparent)' },
  warning: { icon: 'lucide:triangle-alert', color: 'var(--color-engineering)', tint: 'color-mix(in srgb, var(--color-engineering) 8%, transparent)' },
  danger: { icon: 'lucide:shield-alert', color: 'var(--color-security)', tint: 'var(--color-security-soft)' },
} as const

const cfg = computed(() => MAP[props.type])
</script>

<template>
  <aside
    class="not-prose my-6 rounded-r-md border-l-2 py-3 pl-4 pr-4"
    :style="{ borderColor: cfg.color, background: cfg.tint }"
  >
    <div class="flex items-center gap-2" :style="{ color: cfg.color }">
      <Icon :name="cfg.icon" class="h-4 w-4" />
      <span class="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em]">{{ title ?? type }}</span>
    </div>
    <div class="callout-body mt-1.5 text-[0.9375rem] leading-relaxed text-foreground/90">
      <slot />
    </div>
  </aside>
</template>

<style scoped>
.callout-body :deep(p) {
  margin: 0.35rem 0;
}
.callout-body :deep(p:first-child) {
  margin-top: 0;
}
.callout-body :deep(p:last-child) {
  margin-bottom: 0;
}
.callout-body :deep(a) {
  color: var(--color-signal);
  text-decoration: underline;
  text-underline-offset: 2px;
}
</style>
