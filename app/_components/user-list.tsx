import { getAllUsers } from '@/queries/users-query'
import { useQuery } from '@tanstack/react-query'

export default function UserListCom() {
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  })

  return (
    <div className="mt-5">
      {usersQuery.isPending ? (
        <h2>Loading</h2>
      ) : (
        usersQuery.data?.data.map((user) => (
          <li key={user.id}>
            id: {user.id}, username: {user.username}, email: {user.email}
          </li>
        ))
      )}
    </div>
  )
}
