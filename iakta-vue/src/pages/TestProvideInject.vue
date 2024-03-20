<script setup lang="ts">
import { provide, ref } from 'vue'
import ComponentA from '../components/ComponentA.vue'
import { searchKey } from '../types/keys'

defineOptions({
  name: 'TestProvideInject',
  inheritAttrs: false,
})

const search = ref('')
function updateSearch(value: string) {
  search.value = value
}
provide(searchKey, { search, updateSearch })
</script>

<template>
  <div>
    <h1>
      Test provide and inject
      search = {{ search }}
      <ComponentA />

      <ComponentA />
    </h1>
  </div>
</template>
