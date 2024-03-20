import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  id: number
  name: string
  email: string
  created_at: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>({
    id: 1,
    name: 'John Doe',
    email: 'matteo@email.it',
    created_at: '2021-01-01T00:00:00Z',
  })
  const token = ref<string | null>(null)

  function login() {
    // ...
  }

  return {
    user,
    token,
    login,
  }
})
