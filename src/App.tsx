import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from '@/layouts/PublicLayout';
import AdminLayout from '@/layouts/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import HomePage from '@/pages/public/HomePage';
import ProjectsPage from '@/pages/public/ProjectsPage';
import ContactPage from '@/pages/public/ContactPage';
import DashboardPage from '@/pages/admin/DashboardPage';
import LoginPage from '@/pages/admin/LoginPage';
import ProjectsListPage from '@/pages/admin/ProjectsListPage';
import ProjectEditPage from '@/pages/admin/ProjectEditPage';
import SkillsListPage from '@/pages/admin/SkillsListPage';
import SkillEditPage from '@/pages/admin/SkillEditPage';

function App() {
  return (
    <BrowserRouter>
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
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
