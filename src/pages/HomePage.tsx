import { HomeHero } from '../components/home/HomeHero'
import { PartnersStrip } from '../components/home/PartnersStrip'
import { HomeStats } from '../components/home/HomeStats'
import { CriticalSafety } from '../components/home/CriticalSafety'
import { ProcessSteps } from '../components/home/ProcessSteps'
import { RegistryExplore } from '../components/home/RegistryExplore'
import { AppPromo } from '../components/home/AppPromo'
import { Testimonials } from '../components/home/Testimonials'
import { FaqSection } from '../components/home/FaqSection'
import { Newsletter } from '../components/home/Newsletter'
import { PublicSafetyNotice } from '../components/home/PublicSafetyNotice'

export function HomePage() {
  return (
    <>
      <HomeHero />
      <PartnersStrip />
      <HomeStats />
      <CriticalSafety />
      <ProcessSteps />
      <RegistryExplore />
      <AppPromo />
      <Testimonials />
      <FaqSection />
      <Newsletter />
      <PublicSafetyNotice />
    </>
  )
}
