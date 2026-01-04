'use client'

import { useEffect } from 'react'
import { useLanguage } from './i18n-provider'
import I18nProvider from './i18n-provider'

interface DynamicFontWrapperProps {
  children: React.ReactNode
}

export function DynamicFontWrapper({ children }: DynamicFontWrapperProps) {
  const { currentLanguage } = useLanguage()

  useEffect(() => {
    const body = document.body

    // Remove existing font classes
    body.classList.remove('font-montserrat', 'font-hind-siliguri')

    // Add the appropriate font class based on language
    if (currentLanguage === 'bn') {
      body.classList.add('font-hind-siliguri')
    } else {
      // Default to Montserrat for English and other languages
      body.classList.add('font-montserrat')
    }
  }, [currentLanguage])

  return <>{children}</>
}
