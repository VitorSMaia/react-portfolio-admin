import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from '@/layouts/PublicLayout';
import AdminLayout from '@/layouts/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';

// Public Pages
import HomePage from '@/pages/public/HomePage';
import ProjectsPage from '@/pages/public/ProjectsPage';
import ContactPage from '@/pages/public/ContactPage';

// Admin Pages (Lazy Loaded)
const DashboardPage = lazy(() => import('@/pages/admin/DashboardPage'));
const LoginPage = lazy(() => import('@/pages/admin/LoginPage'));
const ProjectsListPage = lazy(() => import('@/pages/admin/ProjectsListPage'));
const ProjectEditPage = lazy(() => import('@/pages/admin/ProjectEditPage'));
const SkillsListPage = lazy(() => import('@/pages/admin/SkillsListPage'));
const SkillEditPage = lazy(() => import('@/pages/admin/SkillEditPage'));
const VisitorLogsPage = lazy(() => import('@/pages/admin/VisitorLogsPage'));
const SkillCategoryListPage = lazy(() => import('@/pages/admin/SkillCategoryListPage'));
const SkillCategoryEditPage = lazy(() => import('@/pages/admin/SkillCategoryEditPage'));
const SkillsByCategoryPage = lazy(() => import('@/pages/admin/SkillsByCategoryPage'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#020617]">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />

          {/* Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="projects" element={<ProjectsListPage />} />
              <Route path="projects/new" element={<ProjectEditPage />} />
              <Route path="projects/:id/edit" element={<ProjectEditPage />} />
              <Route path="skills" element={<SkillsListPage />} />
              <Route path="skills/new" element={<SkillEditPage />} />
              <Route path="skills/:id/edit" element={<SkillEditPage />} />
              <Route path="skill-categories" element={<SkillCategoryListPage />} />
              <Route path="skill-categories/new" element={<SkillCategoryEditPage />} />
              <Route path="skill-categories/edit/:id" element={<SkillCategoryEditPage />} />
              <Route path="skill-categories/:id/skills" element={<SkillsByCategoryPage />} />
              <Route path="logs" element={<VisitorLogsPage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
