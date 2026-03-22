import { Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout'
import { HomePage } from './pages/HomePage'
import { RegistryPage } from './pages/RegistryPage'
import { ManufacturersPage } from './pages/ManufacturersPage'
import { ManufacturerProfilePage } from './pages/ManufacturerProfilePage'
import { RecallsPage } from './pages/RecallsPage'
import { ContactPage } from './pages/ContactPage'
import { VerifyPage } from './pages/VerifyPage'
import { ManufacturerLoginPage } from './pages/ManufacturerLoginPage'
import { AboutPage } from './pages/AboutPage'
import { ManufacturerRegisterPage } from './pages/ManufacturerRegisterPage'
import { ManufacturerVerifyEmailPage } from './pages/ManufacturerVerifyEmailPage'
import { ManufacturerAccountFlaggedPage } from './pages/ManufacturerAccountFlaggedPage'
import { ManufacturerAccountReviewPage } from './pages/ManufacturerAccountReviewPage'
import { ManufacturerVerificationSuccessPage } from './pages/ManufacturerVerificationSuccessPage'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/registry" element={<RegistryPage />} />
        <Route path="/manufacturers" element={<ManufacturersPage />} />
        <Route path="/manufacturers/:slug" element={<ManufacturerProfilePage />} />
        <Route path="/recalls" element={<RecallsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/verify/:productId?" element={<VerifyPage />} />
        <Route path="/genuine-verification/:productId?" element={<VerifyPage />} />
      </Route>
      <Route path="/manufacturer/login" element={<ManufacturerLoginPage />} />
      <Route path="/manufacturer/register" element={<Navigate to="/manufacturer/register/1" replace />} />
      <Route path="/manufacturer/register/:step" element={<ManufacturerRegisterPage />} />
      <Route path="/manufacturer/verify-email" element={<ManufacturerVerifyEmailPage />} />
      <Route path="/manufacturer/account-flagged" element={<ManufacturerAccountFlaggedPage />} />
      <Route path="/manufacturer/pending-review" element={<ManufacturerAccountReviewPage />} />
      <Route path="/manufacturer/verified" element={<ManufacturerVerificationSuccessPage />} />
    </Routes>
  )
}
