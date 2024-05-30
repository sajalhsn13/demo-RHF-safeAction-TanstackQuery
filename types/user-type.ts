import { z } from 'zod'

export const userFormSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
})

export const userSchema = userFormSchema.extend({
  id: z.number(),
})

export type UserForm = z.infer<typeof userFormSchema>
export type User = z.infer<typeof userSchema>
