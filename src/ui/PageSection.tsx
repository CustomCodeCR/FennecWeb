import type { ReactNode } from 'react'

interface PageSectionProps {
  children: ReactNode
  variant?: 'light' | 'soft' | 'dark'
  className?: string
  id?: string
}

const variants = {
  light: 'bg-white text-slate-950',
  soft: 'bg-gradient-to-b from-slate-50 to-white text-slate-950',
  dark: 'bg-slate-950 text-white',
}

function PageSection({
  children,
  variant = 'light',
  className = '',
  id,
}: PageSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full px-6 py-20 md:px-8 md:py-24 ${variants[variant]} ${className}`}
    >
      <div className="mx-auto w-full max-w-7xl">
        {children}
      </div>
    </section>
  )
}

export default PageSection
