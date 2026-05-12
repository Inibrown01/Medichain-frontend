import { MarketingHero } from '../marketing/MarketingHero'

export function AboutHero() {
  return (
    <MarketingHero
      titleSans="The Standard of"
      titleSerif="Health Integrity."
      description={
        "MediChain NG stands as Nigeria's definitive digital shield against counterfeit health products, merging advanced technology with national regulatory standards."
      }
      ctaLabel="Verify now"
      ctaTo="/genuine-verification/amx-500"
      socialProofCount="155,000+ verified users"
      portraitImageSrc="https://images.unsplash.com/photo-1584308666744-24d5c474e2ae?w=900&q=85"
      portraitAlt="Medicines and health products representing verified integrity"
    />
  )
}
