import { useLocation } from 'react-router-dom'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
}: SectionHeaderProps) {
  const { pathname } = useLocation()
  const alignment =
    align === 'center'
      ? 'mx-auto text-center items-center'
      : 'text-left items-start'
  const isPrimaryPageHeading = pathname === '/web-tracking' || pathname === '/cotizacion'
  const HeadingTag = isPrimaryPageHeading ? 'h1' : 'h2'

  return (
    <header className={`mb-12 flex max-w-3xl flex-col ${alignment}`}>
      {eyebrow && (
        <span className="mb-3 inline-block text-xs font-extrabold uppercase tracking-[0.2em] text-[#c8171d]">
          {eyebrow}
        </span>
      )}

      <HeadingTag className="m-0 text-[clamp(2.1rem,4vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.035em] text-slate-950">
        {title}
      </HeadingTag>

      {description && (
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 md:text-[17px]">
          {description}
        </p>
      )}
    </header>
  )
}

export default SectionHeader
