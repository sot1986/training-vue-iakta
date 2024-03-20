<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
    validator: (value: string) => value.length > 0,
  },
  name: String,
  label: String,
  id: String,
  errorMsg: String,
})

const emits = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'canta', value: string): void
}>()
const uuid = computed(() => props.id ?? 'string-random')
function updateValue(e: Event) {
  const { value } = e.target as HTMLInputElement
  emits('update:modelValue', value)
}
</script>

<template>
  <div :class="errorMsg ? 'error' : undefined">
    <button type="button" @click="$emit('canta', 'ciao')">
      Canta
    </button>
    <label :for="uuid" class="block text-sm font-medium leading-6 text-gray-900">
      <slot name="label">{{ label ?? name }}</slot>
    </label>
    <slot name="before" :uuid="uuid" />
    <div class="relative mt-2 rounded-md shadow-sm">
      <input
        :id="uuid" :value="modelValue" :name="name" class="block w-full rounded-md border-0 py-1.5 pr-10 text-skin-base-field  ring-1 ring-inset ring-skin-base-field placeholder:text-skin-placeholder-field focus:ring-2 focus:ring-inset focus:ring-skin-focus-field sm:text-sm sm:leading-6"
        placeholder="you@example.com" :aria-invalid="!!errorMsg"

        :aria-describedby="errorMsg
          ? `error-${uuid}`
          : undefined"
        v-bind="$attrs"
        @input="updateValue"
      >
      <div v-if="errorMsg" class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
      </div>
    </div>
    <p v-if="errorMsg" :id="`error-${uuid}`" class="mt-2 text-sm text-red-600">
      {{ errorMsg }}
    </p>
  </div>
</template>
