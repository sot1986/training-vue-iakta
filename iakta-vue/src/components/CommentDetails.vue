<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Comment } from '../types'
import { commentSchema } from '../types'
import usePromise from '../composables/usePromise'
import { api, apiResource } from '../utils/api'

defineOptions({
  name: 'CommentDetails',
  inheritAttrs: false,
})

const props = defineProps<{
  postId: string
  commentId: string
}>()

const comment = ref<Comment>()
const { result, createPromise } = usePromise(api, {})

watch(() => [props.commentId, props.postId], async () => {
  await createPromise(`api/posts/${props.postId}/comments/${props.commentId}`)
  if (!result.value)
    return

  const check = apiResource(commentSchema).safeParse(result.value)
  if (check.success)
    comment.value = check.data.data
  else
    console.error(check.error)
}, { immediate: true, deep: true })
</script>

<template>
  <div>
    <p class="text-sm text-gray-500">
      {{ comment?.content }}
    </p>
  </div>
</template>
