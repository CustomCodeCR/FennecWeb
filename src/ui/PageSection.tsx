import type { ReactNode } from 'react'

interface PageSectionProps {
  children: ReactNode
  variant?: 'light' | 'soft' | 'dark'
  className?: string
  id?: string
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
      className={`page-section page-section-${variant} ${className}`}
    >
      <div className="page-section-container">
        {children}
      </div>
    </section>
  )
}

export default PageSection