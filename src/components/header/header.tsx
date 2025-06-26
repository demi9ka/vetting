import { PAGES } from '@/config/pages'
import Link from 'next/link'
import { Button } from '../ui/button'
import ThemeToggle from './ThemeToggle'
import { Telescope } from 'lucide-react'

export const Header = () => {
  return (
    <div className='z-11 fixed top-0 left-0 w-full bg-card/60 shadow-sm backdrop-blur-[2px]  flex justify-center'>
      <div className='w-full max-w-[1920px] flex p-3 pl-4  justify-between items-center'>
        <Link className='flex gap-3 items-center' href={PAGES.main}>
          <Telescope size={26} className='stroke-1' />
          <h1 className='font-raleway font-light text-2xl'>Vetting</h1>
        </Link>
        <div className='flex gap-4 items-center'>
          <ThemeToggle />
          <Link href={PAGES.auth}>
            <Button>Авторизация</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
