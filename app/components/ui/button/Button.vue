<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { buttonVariants, type ButtonVariants } from '.'

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariants['variant']
    size?: ButtonVariants['size']
    as?: string
    class?: string
  }>(),
  { as: 'button' },
)

const classes = computed(() => cn(buttonVariants({ variant: props.variant, size: props.size }), props.class))
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>
