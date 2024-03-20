<script setup lang="ts">
import { ref, watch } from 'vue'
import { z } from 'zod'
import api from '../utils/api'
import type { Post, User } from '../types'
import { postSchema, userSchema } from '../types'
import usePromise from '../composables/usePromise'
import usePaginator from '../composables/usePaginator'

defineOptions({
  name: 'PostList',
  inheritAttrs: false,
})

interface PostWithUsers extends Post {
  user: User
}

const dataSchema = z.object({
  data: z.array(postSchema.merge(z.object({
    user: userSchema,
  }))),
})
const posts = ref<PostWithUsers[]>([])
const { result, error, loading, createPromise } = usePromise(api, {
  schema: dataSchema,
})

async function fetchPosts(page: number = 1) {
  return createPromise('api/posts', {
    query: {
      page,
    },
  })
}
watch(() => result.value?.data.map(p => p.id), (newPosts) => {
  if (newPosts)
    posts.value = result.value?.data ?? []
}, { deep: true })

await fetchPosts()

const { page, prevPage, nextPage } = usePaginator()

watch(page, () => {
  fetchPosts(page.value)
})
</script>

<template>
  <div>
    <h1>Lista di post</h1>
    <div v-if="loading">
      <span class="animate-spin">
        Rotella
      </span>
    </div>
    <div>
      <span v-if="error" class="text-red-500 text-xl">
        {{ error }}
      </span>
    </div>
    <ul role="list" class="divide-y divide-gray-100">
      <li v-for="post in posts" :key="post.id" class="flex flex-col gap-2">
        <span class="block font-semibold text-xl">{{ post.title }}</span>
        <p class="text-gray-500 text-sm line-clamp-2">
          {{ post.content }}
        </p>
      </li>
    </ul>
    <div class="flex justify-between">
      <button type="button" @click="prevPage">
        Pre
      </button>
      <button type="button" @click="nextPage">
        Next
      </button>
    </div>
  </div>
</template>
