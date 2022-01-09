
<template>
  <!-- eslint-disable vue/require-component-is -->
  <!-- eslint-disable-next-line vue/require-component-is -->
  <component v-bind="linkProps(to, target)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    },
    target: {
      type: String,
      default: ''
    }
  },
  methods: {
    linkProps(url, target) {
      // if (isExternal(url)) {
      //   return {
      //     is: 'a',
      //     href: url,
      //     target: '_blank',
      //     rel: 'noopener'
      //   }
      // }
      return {
        is: 'router-link',
        to: url,
        target: target
      }
    }
  }
}
</script>
