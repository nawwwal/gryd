import React from 'react'

// Props interface at the top
interface MagazineComponentProps {
  title?: string
  children?: React.ReactNode
  className?: string
  variant?: 'article' | 'sidebar' | 'feature'
  textured?: boolean
}

// Component as named export with full TypeScript typing
export const MagazineComponent = ({
  title,
  children,
  className = "",
  variant = 'article',
  textured = false
}: MagazineComponentProps) => {
  const baseClasses = `
    // Base magazine styling
    bg-gryd-bg text-gryd-text font-fraunces

    // Tactile interaction
    transition-all duration-200

    // Paper texture effect
    ${textured ? 'relative overflow-hidden' : ''}
  `

  const variantClasses = {
    article: 'max-w-prose leading-relaxed space-y-6',
    sidebar: 'max-w-sm text-sm text-gryd-soft',
    feature: 'text-center space-y-8 py-12'
  }

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {/* Paper texture overlay */}
      {textured && (
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-gryd-soft/5 to-transparent opacity-30 pointer-events-none" />
      )}

      {/* Magazine-style title */}
      {title && (
        <h2 className="font-platypi text-2xl font-bold uppercase tracking-tight leading-tight">
          {title}
        </h2>
      )}

      {/* Content with reading flow */}
      <div className="reading-flow">
        {children}
      </div>
    </div>
  )
}

// Export types for reuse
export type { MagazineComponentProps }
