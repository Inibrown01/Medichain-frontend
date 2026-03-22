import { Link } from 'react-router-dom'
import { Logo } from '../brand/Logo'
import { Container } from './Container'

const quick = [
  { to: '/', label: 'Home' },
  { to: '/registry', label: 'Registry' },
  { to: '/genuine-verification/amx-500', label: 'Genuine verification' },
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
  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo to="/" />
            <p className="text-sm leading-relaxed text-brand-muted">
              MediChain NG connects citizens and regulators to verified product data — reducing
              counterfeit risk across Nigeria&apos;s pharmaceutical supply chain.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-brand-secondary">Quick links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {quick.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-brand-muted hover:text-brand-primary">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-brand-secondary">Resources</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {resources.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-brand-muted hover:text-brand-primary">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-brand-secondary">Contact us</h3>
            <ul className="mt-4 space-y-2 text-sm text-brand-muted">
              <li>
                <a href="mailto:support@medichainng.gov.ng" className="hover:text-brand-primary">
                  support@medichainng.gov.ng
                </a>
              </li>
              <li>
                <a href="tel:+2348000000000" className="hover:text-brand-primary">
                  +234 800 000 0000
                </a>
              </li>
              <li>Abuja, Nigeria</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-8 text-sm text-brand-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} MediChain NG · PharmVerify NG. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/about" className="hover:text-brand-primary">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-brand-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
