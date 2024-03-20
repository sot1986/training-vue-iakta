<script setup lang="ts">
import { usePostDetails } from '../composables/usePostDetails'

defineOptions({
  name: 'PostPage',
  inheritAttrs: false,
})

const props = defineProps<{
  postId: string
}>()

const links = [
  { post: 1, comments: [1, 2, 3] },
  { post: 2, comments: [4, 5, 6] },
  { post: 3, comments: [7, 8, 9] },
]

const { post } = usePostDetails(props)
</script>

<template>
  <div>
    <h1>Show post and comment</h1>

    <ul class="flex flex-col gap-y-2">
      <li v-for="link in links" :key="`post-${link.post}`">
        <ul class="flex gap-x-4">
          <li>Post: {{ link.post }}</li>
          <li v-for="comment in link.comments" :key="`comment-${comment}`">
            <router-link
              :to="{
                name: 'postAndComment',
                params: { postId: link.post, commentId: comment } }"
            >
              Comment: {{ comment }}
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
    <div class="flex flex-col gap-y-10">
      <div v-if="post">
        <h2>{{ post.title }}</h2>
        <p>
          {{ post.content }}
        </p>
        <p v-if="post.comments_count">
          Number of comments {{ post.comments_count }}
        </p>
      </div>
      <div v-else>
        Loading...
      </div>
    </div>
    <div>
      <Suspense>
        <router-view :post-id="postId" />
      </Suspense>
    </div>
  </div>
</template>
