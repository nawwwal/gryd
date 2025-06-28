import React from 'react'
import { Helmet } from 'react-helmet-async'
import { MagazineSection } from '@/components/MagazineSection'
import { ScrollFade } from '@/components/ScrollFade'

interface MagazinePageProps {
  title: string
  description: string
  children: React.ReactNode
  className?: string
}

/**
 * Standard page template for THE GRYD magazine
 * Includes proper SEO, magazine layout, and tactile interactions
 */
export const MagazinePage = ({
  title,
  description,
  children,
  className = ""
}: MagazinePageProps) => {
  return (
    <>
      {/* SEO and Meta Tags */}
      <Helmet>
        <title>{title} — THE GRYD permanent issue 01</title>
        <meta name="description" content={description} />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="THE GRYD" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        {/* Magazine-specific meta */}
        <meta name="author" content="Aditya Nawal" />
        <meta name="publisher" content="THE GRYD" />
      </Helmet>

      {/* Magazine Layout */}
      <MagazineSection className={`min-h-screen ${className}`}>
        {/* Page Header with Drop Cap */}
        <header className="mb-12">
          <h1 className="font-platypi text-4xl md:text-6xl font-bold uppercase tracking-tight leading-none drop-cap">
            {title}
          </h1>
          <p className="font-fraunces text-xl text-gryd-soft mt-4 max-w-prose leading-relaxed">
            {description}
          </p>
        </header>

        {/* Page Content with Scroll Animations */}
        <ScrollFade>
          <main className="reading-flow space-y-8 max-w-prose">
            {children}
          </main>
        </ScrollFade>

        {/* Magazine-style footer */}
        <footer className="mt-16 pt-8 border-t border-gryd-soft/20">
          <p className="font-jetbrains text-xs text-gryd-soft uppercase tracking-wide">
            THE GRYD — permanent issue 01
          </p>
        </footer>
      </MagazineSection>
    </>
  )
}

// Export types
export type { MagazinePageProps }
