'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const formSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Логин должен содержать минимум 3 символа')
      .max(20, 'Логин должен содержать максимум 20 символов')
      .regex(/^[a-zA-Z0-9_]+$/, 'Логин может содержать только латинские буквы, цифры и _'),
    password: z
      .string()
      .min(6, 'Пароль должен содержать минимум 6 символов')
      .regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
      .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword']
  })

type FormData = z.infer<typeof formSchema>

export const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='space-y-3'>
        <div className='space-y-2'>
          <Label htmlFor='username'>Логин</Label>
          <Input id='username' {...register('username')} />
          {errors.username && <p className='text-sm text-red-500'>{errors.username.message}</p>}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='password'>Пароль</Label>
          <Input type='password' id='password' {...register('password')} />
          {errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='confirmPassword'>Подтверждение пароля</Label>
          <Input type='password' id='confirmPassword' {...register('confirmPassword')} />
          {errors.confirmPassword && <p className='text-sm text-red-500'>{errors.confirmPassword.message}</p>}
        </div>
      </div>

      <Button type='submit'>Зарегистрироваться</Button>
    </form>
  )
}
