import { FetchError } from 'ofetch'
import { type Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { z } from 'zod'

export default function usePromise<TParams extends unknown[], TResp>(
  fn: (...params: TParams) => Promise<unknown>,
  option: {
    schema?: z.ZodSchema<TResp>
  },
) {
  const router = useRouter()

  const result = ref<TResp | null>(null) as Ref<TResp | null>
  const error = ref<Error | null>(null)
  const loading = ref(false)

  async function createPromise(...args: TParams) {
    if (loading.value)
      return Promise.resolve()

    loading.value = true
    error.value = null
    try {
      const data = await fn(...args)
      if (option.schema) {
        const validatedData = option.schema.parse(data)
        result.value = validatedData
      }
      else {
        result.value = data as TResp
      }
    }
    catch (err) {
      if (err instanceof FetchError && err.response?.status === 401) {
        await router.push({ name: 'login' })
        return
      }
      if (err instanceof Error)
        error.value = err
      else
        error.value = new Error('Unknown error')
    }
    finally {
      loading.value = false
    }
  }
  function reset() {
    result.value = null
    error.value = null
    loading.value = false
  }

  return {
    result,
    error,
    loading,
    createPromise,
    reset,
  }
}
