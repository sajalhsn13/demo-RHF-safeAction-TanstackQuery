'use client'

import { userFormAction } from '@/actions/user-form-action'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { Loader2 } from 'lucide-react'
import { UserForm, userFormSchema } from '@/types/user-type'
import { useQueryClient } from '@tanstack/react-query'

export default function UserFormCom() {
  const form = useForm<UserForm>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  })

  const queryClient = useQueryClient()

  const useUserFormAction = useAction(userFormAction, {
    onExecute: (input) => {
      console.log('onExecute', input)
    },
    onSuccess: (data, input, reset) => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      })
    },
    onSettled: (result, input, reset) => {},
    onError: (error, input, reset) => {},
  })

  function onSubmit(values: UserForm) {
    useUserFormAction.execute(values)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[500px]">
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter user email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className=" mt-2">
          <Button
            className={cn('w-full')}
            type="submit"
            disabled={useUserFormAction.status === 'executing'}
          >
            {useUserFormAction.status === 'executing' && <Loader2 className="animate-spin mr-1" />}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}
