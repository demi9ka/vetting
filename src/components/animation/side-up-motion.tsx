'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const SlideUpMotion = ({ children }: Props) => {
  return (
    <motion.div
      initial={{ y: 15, opacity: 0 }} // Очень небольшое смещение
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1] // Плавная кривая
      }}
      className='fixed top-4 left-0 right-0 mx-auto w-full max-w-md'
    >
      {children}
    </motion.div>
  )
}
