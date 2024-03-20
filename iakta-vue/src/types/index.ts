import { z } from 'zod'

export const userSchema = z.object({
  id: z.number().int().gt(0),
  name: z.string().max(255),
  email: z.string().email(),
  created_at: z.string().datetime(),
})

export type User = z.infer<typeof userSchema>

export const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  user_id: z.number(),
  comments_count: z.number().optional(),
})

export type Post = z.infer<typeof postSchema>

export const commentSchema = z.object({
  id: z.number(),
  content: z.string(),
  post_id: z.number(),
  user_id: z.number(),
})

export type Comment = z.infer<typeof commentSchema>
