<template>
  <i v-html="customSvg" :style="{ width: `${size}px`, height: `${size}px` }" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  const props = defineProps({
    icon: {
      type: String,
      required: true
    },
    size: {
      required: false,
      type: Number,
      default: 24
    },
    stroke: {
      required: false,
      type: String,
      default: ''
    },
    fill: {
      required: false,
      type: String,
      default: ''
    }
  })
  const modules = import.meta.glob('../../icons/svg/**/*.svg', {
    as: 'raw',
    eager: true
  })
  const svg = computed(() => {
    return modules['../../icons/svg/' + props.icon + '.svg'] ?? modules['../../icons/svg/vue.svg']
  })
  const customSvg = computed(() => {
    let customSvg = svg.value.replace(new RegExp(`\\\swidth="[0-9]+"`, 'gm'), ` width="${props.size}"`).replace(new RegExp(`\\\sheight="[0-9]+"`, 'gm'), ` height="${props.size}"`)
    if (props.stroke) {
      customSvg = customSvg.replace(new RegExp(`\\\sstroke="\\S+"`, 'gm'), ` stroke="${props.stroke}"`)
    }
    if (props.fill) {
      customSvg = customSvg.replace(new RegExp(`\\\sfill="\\S+"`, 'gm'), ` fill="${props.fill}"`)
    }
    return customSvg
  })
</script>
