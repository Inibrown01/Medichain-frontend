import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Container } from '../layout/Container'
import { ScrollReveal } from '../motion/ScrollReveal'

const defaultAvatars = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=face',
] as const

export type MarketingHeroProps = {
  titleSans: string
  titleSerif: string
  description: string
  ctaLabel: string
  ctaTo: string
  socialProofCount: string
  portraitImageSrc: string
  portraitAlt: string
  avatars?: readonly string[]
}

export function MarketingHero({
  titleSans,
  titleSerif,
  description,
  ctaLabel,
  ctaTo,
  socialProofCount,
  portraitImageSrc,
  portraitAlt,
  avatars = defaultAvatars,
}: MarketingHeroProps) {
  return (
    <ScrollReveal
      as="section"
      className="relative overflow-hidden bg-[#0b1120] text-white"
      direction="none"
      scale
    >
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80')] bg-cover bg-center"
        aria-hidden
      />
      <div className="absolute inset-0 bg-[#0b1120]/88" aria-hidden />
      <Container className="relative grid min-h-[560px] items-center gap-12 py-16 md:min-h-[620px] md:grid-cols-2 md:gap-16 md:py-24 lg:min-h-[680px] lg:py-28">
        <div className="max-w-[32rem]">
          <h1 className="font-sans text-[clamp(2.25rem,5vw+1rem,4rem)] font-bold leading-[1.08] tracking-tight text-white">
            {titleSans}{' '}
            <span className="font-serif italic text-[#A5D8FF]">{titleSerif}</span>
          </h1>
          <p className="mt-8 max-w-[500px] text-base font-medium leading-relaxed text-white md:text-lg">
            {description}
          </p>
          {ctaTo.startsWith('#') ? (
            <a
              href={ctaTo}
              className="mt-10 inline-flex items-center gap-2 rounded-[12px] bg-[#2563EB] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-colors hover:bg-[#1d4edd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.25} />
            </a>
          ) : (
            <Link
              to={ctaTo}
              className="mt-10 inline-flex items-center gap-2 rounded-[12px] bg-[#2563EB] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-colors hover:bg-[#1d4edd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.25} />
            </Link>
          )}
          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {avatars.map((src, i) => (
                <img
                  key={`${i}-${src}`}
                  src={src}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border-2 border-[#0b1120] object-cover"
                  style={{ zIndex: avatars.length - i }}
                />
              ))}
            </div>
            <p className="text-sm font-medium text-white/95">{socialProofCount}</p>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
          <div
            className="absolute -bottom-1 -left-1 z-20 flex h-[7.25rem] w-[7.25rem] items-center justify-center rounded-full bg-[#2563EB] shadow-xl sm:h-[7.75rem] sm:w-[7.75rem]"
            style={{ transform: 'rotate(-18deg)' }}
            aria-hidden
          >
            <span className="max-w-[5.5rem] text-center text-[0.625rem] font-bold uppercase leading-snug tracking-wide text-white">
              National safety standard
            </span>
          </div>
          <div className="relative overflow-hidden rounded-[48px] border-[10px] border-[#1e293b] shadow-2xl shadow-black/40">
            <img
              src={portraitImageSrc}
              alt={portraitAlt}
              className="aspect-[4/5] w-full object-cover"
              width={560}
              height={700}
              loading="eager"
            />
          </div>
        </div>
      </Container>
    </ScrollReveal>
  )
}
