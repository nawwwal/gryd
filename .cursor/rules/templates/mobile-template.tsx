import React, { useState, useCallback, useEffect } from 'react'

// Mobile-optimized component interface
interface MobileMagazineComponentProps {
  children: React.ReactNode
  className?: string
  enableSwipe?: boolean
  adaptToConnection?: boolean
  touchFeedback?: boolean
}

/**
 * Mobile-optimized component template for THE GRYD magazine
 * Includes touch feedback, connection awareness, and magazine-style interactions
 */
export const MobileMagazineComponent = ({
  children,
  className = "",
  enableSwipe = false,
  adaptToConnection = true,
  touchFeedback = true
}: MobileMagazineComponentProps) => {

  // Connection quality state
  const [connectionQuality, setConnectionQuality] = useState<'high' | 'medium' | 'low'>('medium')

  // Swipe gesture handling
  const handleSwipe = useCallback((direction: 'left' | 'right' | 'up' | 'down') => {
    switch (direction) {
      case 'left':
        // Navigate to next section
        console.log('Swipe left: Next section')
        break
      case 'right':
        // Navigate to previous section
        console.log('Swipe right: Previous section')
        break
      case 'up':
        // Hide navigation for reading mode
        console.log('Swipe up: Reading mode')
        break
      case 'down':
        // Show navigation
        console.log('Swipe down: Show navigation')
        break
    }
  }, [])

  // Monitor connection quality
  useEffect(() => {
    if (!adaptToConnection) return

    const connection = (navigator as any).connection
    if (!connection) return

    const updateQuality = () => {
      const { effectiveType, downlink } = connection

      if (effectiveType === '4g' && downlink > 5) {
        setConnectionQuality('high')
      } else if (effectiveType === '4g' || effectiveType === '3g') {
        setConnectionQuality('medium')
      } else {
        setConnectionQuality('low')
      }
    }

    updateQuality()
    connection.addEventListener('change', updateQuality)
    return () => connection.removeEventListener('change', updateQuality)
  }, [adaptToConnection])

  // Touch feedback classes
  const touchClasses = touchFeedback
    ? 'active:scale-95 active:bg-gryd-soft/10 transition-transform duration-75'
    : ''

  // Connection-aware quality classes
  const qualityClasses = {
    high: 'high-quality-rendering',
    medium: 'medium-quality-rendering',
    low: 'low-quality-rendering'
  }

  const baseClasses = `
    /* Mobile magazine styling */
    bg-gryd-bg text-gryd-text font-fraunces

    /* Touch-friendly sizing */
    min-h-[44px] p-3

    /* Safe area support */
    pb-[env(safe-area-inset-bottom)]
    pl-[env(safe-area-inset-left)]
    pr-[env(safe-area-inset-right)]

    /* Reading optimization */
    leading-relaxed max-w-prose mx-auto

    ${touchClasses}
    ${qualityClasses[connectionQuality]}
    ${className}
  `

  return (
    <div
      className={baseClasses}
      // Swipe gesture props would be added here
      onTouchStart={enableSwipe ? () => {} : undefined}
      onTouchEnd={enableSwipe ? () => {} : undefined}
    >
      {/* Connection quality indicator (development only) */}
      {process.env.NODE_ENV === 'development' && adaptToConnection && (
        <div className="fixed top-4 right-4 z-50 px-2 py-1 bg-gryd-accent text-white text-xs rounded">
          {connectionQuality} connection
        </div>
      )}

      {/* Mobile-optimized content */}
      <div className="touch-magazine-content">
        {children}
      </div>
    </div>
  )
}

// Export mobile optimization hooks for reuse
export const useMobileOptimization = () => {
  const [connectionQuality, setConnectionQuality] = useState<'high' | 'medium' | 'low'>('medium')

  useEffect(() => {
    const connection = (navigator as any).connection
    if (!connection) return

    const updateQuality = () => {
      const { effectiveType, downlink } = connection

      if (effectiveType === '4g' && downlink > 5) {
        setConnectionQuality('high')
      } else if (effectiveType === '4g' || effectiveType === '3g') {
        setConnectionQuality('medium')
      } else {
        setConnectionQuality('low')
      }
    }

    updateQuality()
    connection.addEventListener('change', updateQuality)
    return () => connection.removeEventListener('change', updateQuality)
  }, [])

  const getImageQuality = () => {
    switch (connectionQuality) {
      case 'high': return 85
      case 'medium': return 70
      case 'low': return 45
      default: return 70
    }
  }

  return { connectionQuality, getImageQuality }
}

// Touch feedback hook
export const useTouchFeedback = () => {
  useEffect(() => {
    const handleTouchStart = () => {
      document.body.classList.add('touch-mode')
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.remove('touch-mode')
      }
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
}

// Export types
export type { MobileMagazineComponentProps }
