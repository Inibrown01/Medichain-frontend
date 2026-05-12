import { MarketingHero } from '../marketing/MarketingHero'

const contactAvatars = [
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=96&h=96&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&h=96&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=96&h=96&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=96&h=96&fit=crop&crop=face',
] as const

export function ContactPageHero() {
  return (
    <MarketingHero
      titleSans={"We're here to"}
      titleSerif="Support You."
      description="Reach the MediChain NG team for verification help, manufacturer onboarding, counterfeit reports, and partnership enquiries — routed to analysts who understand national health supply chains."
      ctaLabel="Send a message"
      ctaTo="#contact-form"
      socialProofCount="Trusted by teams across 36 states & the FCT"
      portraitImageSrc="https://images.unsplash.com/photo-1521790797524-b249729729b9?w=900&q=85"
      portraitAlt="Professional support and collaboration"
      avatars={contactAvatars}
    />
  )
}
