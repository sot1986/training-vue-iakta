import { ref, watch } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import type { Post } from '../types'
import { postSchema } from '../types'
import { api, apiResource } from '../utils/api'
import usePromise from './usePromise'

export function usePostDetails(props: { postId: string }) {
  const { result, createPromise } = usePromise(api, {})
  const post = ref<Post>()

  async function updatePost() {
    await createPromise(`/api/posts/${props.postId}`)
    if (!result.value)
      return
    const check = apiResource(postSchema).safeParse(result.value)
    if (check.success)
      post.value = check.data.data
    else
      console.error(check.error)
  }

  watch(() => props.postId, updatePost, { immediate: true })

  onBeforeRouteUpdate(() => {
    console.log('PostDetail updated', props.postId)
  })

  return { post }
}
