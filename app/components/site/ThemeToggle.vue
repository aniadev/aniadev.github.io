<script setup lang="ts">
const colorMode = useColorMode()
const { t } = useI18n()

function toggle() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button
    type="button"
    :aria-label="t('actions.toggleTheme')"
    :title="t('actions.toggleTheme')"
    class="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    @click="toggle"
  >
    <ClientOnly>
      <Icon :name="colorMode.value === 'dark' ? 'lucide:sun' : 'lucide:moon'" class="h-4 w-4" />
      <template #fallback>
        <Icon name="lucide:sun-moon" class="h-4 w-4" />
      </template>
    </ClientOnly>
  </button>
</template>
