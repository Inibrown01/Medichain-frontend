import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminDashboardLayout, ManufacturerDashboardLayout } from './components/dashboard';
import { MainLayout } from './components/layout/MainLayout';
import { HomePage } from './pages/HomePage';
import { RegistryPage } from './pages/RegistryPage';
import { ManufacturersPage } from './pages/ManufacturersPage';
import { ManufacturerProfilePage } from './pages/ManufacturerProfilePage';
import { RecallsPage } from './pages/RecallsPage';
import { ContactPage } from './pages/ContactPage';
import { VerifyPage } from './pages/VerifyPage';
import { ManufacturerLoginPage } from './pages/ManufacturerLoginPage';
import { AboutPage } from './pages/AboutPage';
import { ManufacturerRegisterPage } from './pages/ManufacturerRegisterPage';
import { ManufacturerVerifyEmailPage } from './pages/ManufacturerVerifyEmailPage';
import { ManufacturerAccountFlaggedPage } from './pages/ManufacturerAccountFlaggedPage';
import { ManufacturerAccountReviewPage } from './pages/ManufacturerAccountReviewPage';
import { ManufacturerVerificationSuccessPage } from './pages/ManufacturerVerificationSuccessPage';
import { DashboardHomePage } from './pages/manufacturer/DashboardHomePage';
import { ProductRegistryPage } from './pages/manufacturer/ProductRegistryPage';
import { ProductStatusPage } from './pages/manufacturer/ProductStatusPage';
import { RegisterProductPage } from './pages/manufacturer/RegisterProductPage';
import { BatchManagementPage } from './pages/manufacturer/BatchManagementPage';
import { RegisterBatchPage } from './pages/manufacturer/RegisterBatchPage';
import { RecallHistoryPage } from './pages/manufacturer/RecallHistoryPage';
import { RecallRequestPage } from './pages/manufacturer/RecallRequestPage';
import { QrProductLevelPage } from './pages/manufacturer/QrProductLevelPage';
import { QrBatchLevelPage } from './pages/manufacturer/QrBatchLevelPage';
import { QrLibraryPage } from './pages/manufacturer/QrLibraryPage';
import { VerificationInsightsPage } from './pages/manufacturer/VerificationInsightsPage';
import { CompanyProfilePage } from './pages/manufacturer/CompanyProfilePage';
import { NotificationsPage } from './pages/manufacturer/NotificationsPage';
import { SettingsPage } from './pages/manufacturer/SettingsPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { ProductApprovalsPage } from './pages/admin/ProductApprovalsPage';
import { ReviewSubmissionPage } from './pages/admin/ReviewSubmissionPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminProductDetailPage } from './pages/admin/AdminProductDetailPage';
import { AdminBatchManagementPage } from './pages/admin/AdminBatchManagementPage';
import { AdminBatchDetailPage } from './pages/admin/AdminBatchDetailPage';
import { AdminRecallManagementPage } from './pages/admin/AdminRecallManagementPage';
import { AdminIssueRecallPage } from './pages/admin/AdminIssueRecallPage';
import { AdminSuspiciousReportsPage } from './pages/admin/AdminSuspiciousReportsPage';
import { AdminSuspiciousReportDetailPage } from './pages/admin/AdminSuspiciousReportDetailPage';
import { AdminManufacturersPage } from './pages/admin/AdminManufacturersPage';
import { AdminManufacturerDetailPage } from './pages/admin/AdminManufacturerDetailPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminUserDetailPage } from './pages/admin/AdminUserDetailPage';
import { AdminLogExplorerPage } from './pages/admin/AdminLogExplorerPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminCompliancePage } from './pages/admin/AdminCompliancePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminLoginPage } from './pages/AdminLoginPage';

export default function App() {
  return (
    <Routes>
      <Route path='/admin/login' element={<AdminLoginPage />} />
      <Route path='/manufacturer/login' element={<ManufacturerLoginPage />} />
      <Route
        path='/manufacturer/register'
        element={<Navigate to='/manufacturer/register/1' replace />}
      />
      <Route path='/manufacturer/register/:step' element={<ManufacturerRegisterPage />} />
      <Route path='/manufacturer/verify-email' element={<ManufacturerVerifyEmailPage />} />
      <Route path='/manufacturer/account-flagged' element={<ManufacturerAccountFlaggedPage />} />
      <Route path='/manufacturer/pending-review' element={<ManufacturerAccountReviewPage />} />
      <Route path='/manufacturer/verified' element={<ManufacturerVerificationSuccessPage />} />

      <Route element={<ManufacturerDashboardLayout />}>
        <Route path='/manufacturer/dashboard' element={<DashboardHomePage />} />
        <Route path='/manufacturer/products' element={<ProductRegistryPage />} />
        <Route path='/manufacturer/products/status' element={<ProductStatusPage />} />
        <Route path='/manufacturer/products/new' element={<RegisterProductPage />} />
        <Route path='/manufacturer/batches' element={<BatchManagementPage />} />
        <Route path='/manufacturer/batches/new' element={<RegisterBatchPage />} />
        <Route path='/manufacturer/recalls' element={<RecallHistoryPage />} />
        <Route path='/manufacturer/recalls/new' element={<RecallRequestPage />} />
        <Route path='/manufacturer/qr-codes/product-level' element={<QrProductLevelPage />} />
        <Route path='/manufacturer/qr-codes/batch-level' element={<QrBatchLevelPage />} />
        <Route path='/manufacturer/qr-codes/library' element={<QrLibraryPage />} />
        <Route
          path='/manufacturer/qr-codes'
          element={<Navigate to='/manufacturer/qr-codes/product-level' replace />}
        />
        <Route path='/manufacturer/verification-insights' element={<VerificationInsightsPage />} />
        <Route path='/manufacturer/company-profile' element={<CompanyProfilePage />} />
        <Route path='/manufacturer/notifications' element={<NotificationsPage />} />
        <Route path='/manufacturer/settings' element={<SettingsPage />} />
        <Route path='/manufacturer/*' element={<NotFoundPage />} />
      </Route>

      <Route element={<AdminDashboardLayout />}>
        <Route path='/admin/dashboard' element={<AdminDashboardPage />} />
        <Route path='/admin/approvals' element={<ProductApprovalsPage />} />
        <Route path='/admin/approvals/:id' element={<ReviewSubmissionPage />} />
        <Route path='/admin/products' element={<AdminProductsPage />} />
        <Route path='/admin/products/:productId' element={<AdminProductDetailPage />} />
        <Route path='/admin/batches' element={<AdminBatchManagementPage />} />
        <Route path='/admin/batches/:batchNumber' element={<AdminBatchDetailPage />} />
        <Route path='/admin/recalls' element={<AdminRecallManagementPage />} />
        <Route path='/admin/recalls/new' element={<AdminIssueRecallPage />} />
        <Route path='/admin/suspicious' element={<AdminSuspiciousReportsPage />} />
        <Route path='/admin/suspicious/:id' element={<AdminSuspiciousReportDetailPage />} />
        <Route path='/admin/manufacturers' element={<AdminManufacturersPage />} />
        <Route path='/admin/manufacturers/:id' element={<AdminManufacturerDetailPage />} />
        <Route path='/admin/users' element={<AdminUsersPage />} />
        <Route path='/admin/users/:id' element={<AdminUserDetailPage />} />
        <Route path='/admin/analytics' element={<AdminAnalyticsPage />} />
        <Route path='/admin/logs' element={<AdminLogExplorerPage />} />
        <Route path='/admin/compliance' element={<AdminCompliancePage />} />
        <Route path='/admin/settings' element={<AdminSettingsPage />} />
        <Route path='/admin/*' element={<NotFoundPage />} />
      </Route>

      <Route path='/admin' element={<Navigate to='/admin/dashboard' replace />} />
      <Route path='/manufacturer' element={<Navigate to='/manufacturer/dashboard' replace />} />

      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='registry' element={<RegistryPage />} />
        <Route path='manufacturers' element={<ManufacturersPage />} />
        <Route path='manufacturers/:slug' element={<ManufacturerProfilePage />} />
        <Route path='recalls' element={<RecallsPage />} />
        <Route path='about' element={<AboutPage />} />
        <Route path='contact' element={<ContactPage />} />
        <Route path='verify/:productId?' element={<VerifyPage />} />
        <Route path='genuine-verification/:productId?' element={<VerifyPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
