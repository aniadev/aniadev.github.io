<template>
  <div class="switch" :class="[darkmodeActivated && 'active']" @click="toggleSwitch">
    <div class="wrap-icon">
      <div class="icon">
        <Icon :icon="iconName" :size="18" :stroke="darkmodeActivated ? '#fff' : '#aaaaff'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, watch, ref } from 'vue'
  import { peeUseStore } from '@/store'
  import Icon from './base/Icon.vue'

  const peeStore = peeUseStore()

  const darkmodeActivated = ref<boolean>(true)

  watch(darkmodeActivated, value => {
    document.documentElement.setAttribute('data-theme', value ? 'dark' : 'light')
  })

  const iconName = computed(() => {
    return darkmodeActivated.value ? 'icon-moon' : 'icon-sun'
  })

  //===   methods
  function toggleSwitch() {
    darkmodeActivated.value = !darkmodeActivated.value
    peeStore.theme = darkmodeActivated.value ? 'DARK' : 'LIGHT'
  }

  //=== lifecycle
  onMounted(() => {
    darkmodeActivated.value = peeStore.theme === 'DARK'
    document.documentElement.setAttribute('data-theme', darkmodeActivated.value ? 'dark' : 'light')
  })
</script>

<style lang="scss" scoped>
  .switch {
    position: relative;
    width: 48px;
    height: 24px;
    border-radius: 24px;
    border: 1px solid var(--primary-color);
    &:hover {
      cursor: pointer;
    }
    .input__inner {
      display: none;
    }
    .wrap-icon {
      position: relative;
      width: 100%;
      height: 100%;
      background: var(--primary-color);
      border-radius: inherit;

      .icon {
        position: absolute;
        height: 22px;
        width: 22px;
        border-radius: 50%;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        svg {
          transform: scale(0.8);
        }
      }

      &::before {
        content: '';
        position: absolute;
        height: 22px;
        width: 22px;
        border-radius: 50%;
        background: var(--bg-color);
        left: 0;
        transition: all 0.3s ease;
      }
    }
    &.active {
      .wrap-icon {
        &::before {
          left: 100%;
          transform: translateX(-100%);
        }
        .icon {
          left: 100%;
          transform: translateX(-100%);
        }
      }
    }
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.2s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
