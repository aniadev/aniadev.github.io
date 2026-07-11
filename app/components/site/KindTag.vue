<script setup lang="ts">
import { useKind, type Kind } from '@/composables/useKind'

const props = defineProps<{ kind: Kind }>()
const { color, label } = useKind()
</script>

<template>
  <span class="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground">
    <span class="h-1.5 w-1.5 rounded-full" :style="{ backgroundColor: color(props.kind) }" aria-hidden="true" />
    {{ label(props.kind) }}
  </span>
</template>
