<script setup lang="ts">
// Signature layout device: a narrow monospace label rail on the left, content on the right.
// Echoes a lab-notebook / ledger margin. Collapses to stacked on mobile.
defineProps<{
  label?: string
  index?: string
  as?: string
}>()
</script>

<template>
  <component :is="as ?? 'section'" class="grid gap-x-8 gap-y-4 border-t border-hairline py-10 md:grid-cols-[8rem_1fr] md:py-14 lg:gap-x-14">
    <div v-if="label || index || $slots.rail" class="md:pt-1">
      <div class="flex items-baseline gap-2 md:flex-col md:gap-1">
        <span v-if="index" class="eyebrow tnum text-signal">{{ index }}</span>
        <span v-if="label" class="eyebrow">{{ label }}</span>
      </div>
      <slot name="rail" />
    </div>
    <div class="min-w-0">
      <slot />
    </div>
  </component>
</template>
