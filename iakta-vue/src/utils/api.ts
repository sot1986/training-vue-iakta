import { ofetch } from 'ofetch'
import { z } from 'zod'

const api = ofetch.create({
  baseURL: 'http://localhost',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
  },
})

function apiResource<T extends z.ZodSchema>(schema: T) {
  return z.object({
    data: schema,
  })
}

export {
  api,
  apiResource,
}
export default api
