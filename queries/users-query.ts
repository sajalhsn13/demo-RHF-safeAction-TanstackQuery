import { User } from '@/types/user-type'
import axios from 'axios'

export const getAllUsers = async () => {
  const usersData = (
    await axios.get<{ statusCode: number; data: User[] }>('http://localhost:8080/users')
  ).data
  return usersData
}
