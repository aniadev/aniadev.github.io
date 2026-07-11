<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center px-6 text-center">
    <p class="eyebrow tnum text-signal">{{ error?.statusCode ?? 500 }}</p>
    <h1 class="mt-4 font-display text-4xl font-semibold tracking-display">
      {{ error?.statusCode === 404 ? 'Not found' : 'Something broke' }}
    </h1>
    <p class="mt-3 max-w-md text-sm text-muted-foreground">{{ error?.statusMessage }}</p>
    <button
      type="button"
      class="mt-8 inline-flex items-center gap-1.5 text-sm text-foreground"
      @click="clearError({ redirect: '/' })"
    >
      <Icon name="lucide:arrow-left" class="h-4 w-4 text-signal" />
      <span class="link-underline">Index</span>
    </button>
  </div>
</template>
