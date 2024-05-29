'use client'

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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { z } from 'zod'

// 1: ZOD schema
const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
})

// 2: type of the schema
type Form = z.infer<typeof formSchema>

export default function Home() {
  // 3: useForm of Form type with resolver and default values
  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  })

  // 4: onSubmit function
  function onSubmit(values: Form) {
    console.log(values)
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
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
