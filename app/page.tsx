'use client'

import { UserForm, userFormAction, userFormSchema } from '@/actions/user-form-action'
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

export default function Home() {
  // 3: useForm of Form type with resolver and default values
  const form = useForm<UserForm>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  })

  const useUserFormAction = useAction(userFormAction, {
    onExecute: (input) => {
      console.log('onExecute', input)
    },
    onSuccess: (data, input, reset) => {
      console.log('onSuccess', data, input)
    },
    onSettled: (result, input, reset) => {
      console.log('onSettled', result, input)
    },
    onError: (error, input, reset) => {
      console.log('onError', error, input)
    },
  })

  // 4: onSubmit function
  function onSubmit(values: UserForm) {
    useUserFormAction.execute(values)
    form.reset()
  }

  return (
    <div className="container h-[500px] mx-auto flex justify-center items-center">
      {/* 5: Form is a wrapper container of html form element */}
      <Form {...form}>
        {/* 6: register the onSubmit method */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[500px]">
          <div className="flex gap-2">
            {/* 7: for each field in the schema, there should be a FormField */}
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
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
