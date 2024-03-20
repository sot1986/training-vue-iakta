<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ref } from 'vue'

defineOptions({
  name: 'TestTransition',
  inheritAttrs: false,
})

const links = [
  'primo',
  'secondo',
  'terzo',
]
</script>

<template>
  <div>
    <h1>
      Test Transition
    </h1>

    DropDown
    <Menu v-slot="{ open }">
      <div>
        Trigger

        <MenuButton>
          <svg :class="open ? 'rotate-180' : undefined" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition-transform">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
          <span class="sr-only">Open Menu</span>
        </MenuButton>
      </div>
      <transition
        enter-from-class="opacity-80"
        enter-active-class="transition-opacity duration-300"
        leave-to-class="scale-80"
        leave-active-class="transition-opacity duration-150"
        :appear="true"
      >
        <MenuItems as="ul" class="w-60  bg-gray-200 border border-gray-500">
          <MenuItem v-for="link in links" v-slot="{ active }" :key="link" as="template">
            <li :class="active ? 'bg-blue-500 text-white' : undefined">
              {{ link }}
            </li>
          </MenuItem>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>
