<script setup lang="ts">
import { inject, ref, watch } from 'vue'
import { factorySearch, searchKey } from '../types/keys'

defineOptions({
  name: 'ComponentA',
  inheritAttrs: false,
})
const value = ref('')
const searchProvided = inject(searchKey, factorySearch, true)

watch(value, (v) => {
  const { updateSearch } = searchProvided
  updateSearch(v)
})

watch(() => searchProvided?.search.value, (v) => {
  value.value = v
})
</script>

<template>
  <div>
    <label for="">
      Label A
    </label>
    <input v-model="value">
  </div>
</template>
