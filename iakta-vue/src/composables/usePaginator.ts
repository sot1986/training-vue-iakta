import { useRoute, useRouter } from 'vue-router'
import { computed, watch } from 'vue'

export default function usePaginator() {
  const route = useRoute()
  const router = useRouter()
  const page = computed(() => typeof route.query.page === 'string'
    ? Number(route.query.page)
    : 1,
  )

  function nextPage() {
    return router.push({ query: { page: page.value + 1 } })
  }

  function prevPage() {
    if (page.value === 1)
      return Promise.resolve()

    return router.push({ query: { page: page.value - 1 } })
  }

  return {
    page,
    nextPage,
    prevPage,
  }
}
