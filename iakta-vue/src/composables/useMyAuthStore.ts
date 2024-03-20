import { ref } from 'vue'

const user = ref(null)

export function useMyAuthStore() {
  function login() {
    // ...
  }

  return {
    user,
    login,
  }
}
