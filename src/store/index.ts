import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { IAppTheme } from '@/interfaces/store.interface'

export const peeUseStore = defineStore('peeStore', () => {
  const count = ref(0)
  const theme = ref<IAppTheme>('DARK')
  const name = ref('Eduardo')

  const doubleCount = computed(() => count.value * 2)

  return { count, theme, name, doubleCount }
})
