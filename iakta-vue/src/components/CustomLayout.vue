<script setup lang="ts">
defineOptions({
  name: 'CustomLayout',
  inheritAttrs: false,
})
</script>

<template>
  <div>
    <header>
      Header
    </header>
    <slot />
    <footer>
      footer
    </footer>
  </div>
</template>
