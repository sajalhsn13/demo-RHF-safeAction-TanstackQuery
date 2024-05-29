import { action } from '@/lib/safe-action'
import { z } from 'zod'
import axios from 'axios'

// 1: ZOD schema
export const userFormSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
})

// 2: type of the schema
export type UserForm = z.infer<typeof userFormSchema>

export const userFormAction = action(userFormSchema, async ({ username, email }) => {
  await axios.post('http://localhost:8080/users', {
    username,
    email,
  })
  console.log(`${username}: ${email}`)
  return 'new user added'
})
