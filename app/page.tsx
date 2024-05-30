'use client'

import { queryClient } from '@/lib/query-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import UserFormCom from './_components/user-form'
import UserListCom from './_components/user-list'

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container h-[500px] mx-auto flex flex-col justify-center items-center">
        <UserFormCom />
        <UserListCom />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
