'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const loginSchema = z.object({
  username: z.string().min(1, 'Логин обязателен для заполнения'),
  password: z.string().min(1, 'Пароль обязателен для заполнения')
})

type LoginFormData = z.infer<typeof loginSchema>

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFormData) => {
    console.log('Данные для входа:', data)
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
      </div>

      <Button type='submit'>Войти</Button>
    </form>
  )
}
