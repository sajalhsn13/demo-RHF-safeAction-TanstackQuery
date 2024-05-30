'use server'

import { action } from '@/lib/safe-action'
import { User, userFormSchema } from '@/types/user-type'
import axios from 'axios'

export const userFormAction = action(userFormSchema, async ({ username, email }) => {
  const newUserRes = (
    await axios.post<{ statusCode: number; data: User }>('http://localhost:8080/users', {
      username,
      email,
    })
  ).data
  return newUserRes
})
