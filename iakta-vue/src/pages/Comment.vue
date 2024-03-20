<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue'

defineOptions({
  name: 'Comment',
  inheritAttrs: false,
})

defineProps<{
  postId: string
  commentId: string
}>()

const CommentDetails = defineAsyncComponent(() => import('../components/CommentDetails.vue'))

const temp = ref(0)
setInterval(() => {
  temp.value++
}, 1000)
</script>

<template>
  <div>
    <div v-if="temp > 5">
      <CommentDetails :post-id="postId" :comment-id="commentId" />
    </div>
  </div>
</template>
