import { Link } from 'react-router-dom'
import { Logo } from '../brand/Logo'
import { Container } from './Container'

const quick = [
  { to: '/', label: 'Home' },
  { to: '/registry', label: 'Registry' },
  { to: '/manufacturers', label: 'Manufacturers' },
  { to: '/recalls', label: 'Recalls' },
] as const

const resources = [
  { to: '/about', label: 'Verification Guide' },
  { to: '/recalls', label: 'Safety Tips' },
  { to: '/manufacturer/login', label: 'Manufacturer Portal' },
  { to: '/contact', label: 'API Documentation' },
] as const

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-[#E5E7EB] bg-white">
      <Container className="py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="max-w-sm space-y-4 lg:pr-4">
            <Logo to="/" />
            <p className="text-sm leading-relaxed text-[#6B7280]">
              National health product verification platform dedicated to protecting citizens from counterfeit
              medicines and ensuring public safety through digital innovation.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#111827]">Quick Links</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {quick.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-[#6B7280] transition-colors hover:text-[#2563EB]">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#111827]">Resources</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {resources.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-[#6B7280] transition-colors hover:text-[#2563EB]">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#111827]">Contact Us</h3>
            <ul className="mt-5 space-y-3 text-sm text-[#6B7280]">
              <li>
                <a href="mailto:support@pharmverifyng.gov.ng" className="transition-colors hover:text-[#2563EB]">
                  support@pharmverifyng.gov.ng
                </a>
              </li>
              <li>
                <a href="tel:+2348172723665" className="transition-colors hover:text-[#2563EB]">
                  +234 817 2723 665
                </a>
              </li>
              <li>Abuja, Nigeria</li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-[#E5E7EB] pt-8 text-sm text-[#6B7280] md:flex-row md:items-center md:justify-between">
          <p>© {year} PharmVerify NG. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-8">
            <Link to="/about" className="transition-colors hover:text-[#2563EB]">
              Privacy Policy
            </Link>
            <Link to="/contact" className="transition-colors hover:text-[#2563EB]">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
