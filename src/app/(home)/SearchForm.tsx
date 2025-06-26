'use client'

import { Search } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useDebounce } from 'react-haiku'
import { SearchResult } from './SearchResult'
import { AnimatePresence, motion } from 'framer-motion'

export const SearchForm = () => {
  const [search, setSearch] = useState('')
  const debounceSearch = useDebounce(search)
  const [isFocus, setIsFocus] = useState(false)

  const placeholders = ['SBER', 'AFKS', 'T-BANK']
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const typingSpeed = 150 // скорость печати (мс)
  const pauseDuration = 2000 // пауза между словами (мс)

  const toggleFocus = (state: boolean) => {
    setIsFocus(state)
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isTyping) {
      // Анимация печатания
      if (displayText.length < placeholders[currentIndex].length) {
        timeout = setTimeout(() => {
          setDisplayText(placeholders[currentIndex].substring(0, displayText.length + 1))
        }, typingSpeed)
      } else {
        // Закончили печатать - ждем и начинаем удалять
        timeout = setTimeout(() => {
          setIsTyping(false)
        }, pauseDuration)
      }
    } else {
      // Анимация удаления
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1))
        }, typingSpeed / 2)
      } else {
        // Закончили удалять - переходим к следующему слову
        timeout = setTimeout(() => {
          setCurrentIndex(prev => (prev + 1) % placeholders.length)
          setIsTyping(true)
        }, typingSpeed)
      }
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [displayText, currentIndex, isTyping])

  return (
    <div className='backdrop-blur-sm border-1 border-primary/10 mt-10 relative w-full sm:w-120 flex items-center gap-2 p-2 px-5 bg-accent/40 rounded-lg shadow-accent/20 shadow-xl'>
      <input
        onFocus={() => toggleFocus(true)}
        onBlur={() => toggleFocus(false)}
        className='text-lg grow-2 outline-0 bg-transparent relative z-10 text-foreground/70'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {!search && !isFocus && (
        <AnimatePresence mode='wait'>
          <motion.span
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='absolute left-6 top-1/2 -translate-y-1/2 text-lg  text-muted-foreground pointer-events-none z-0'
          >
            {displayText}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className='ml-0.5'
            >
              |
            </motion.span>
          </motion.span>
        </AnimatePresence>
      )}

      <Search className='opacity-40' size={20} />
      <SearchResult search={debounceSearch} />
    </div>
  )
}
