<script setup lang="ts">
// A key:value ledger entry — the hero's core motif (echoes an eUTXO output: an address key
// mapped to a value). Left key is monospace + uppercase; right value carries the content.
defineProps<{ label: string }>()
</script>

<template>
  <div class="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 border-t border-hairline py-2.5 sm:grid-cols-[7rem_1fr]">
    <dt class="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">{{ label }}</dt>
    <dd class="text-sm text-foreground sm:text-[0.9375rem]">
      <slot />
    </dd>
  </div>
</template>
