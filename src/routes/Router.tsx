// Router.tsx
import { Routes, Route } from 'react-router-dom';
import LoginMain from '../pages/auth/LoginMain';
import Layout from '../layouts/Layout';
import ProtectedRoute from '../auth/protectedRoute';
import Index from "../pages/content/Index";
import Users from '../pages/content/Users';
import RegisterMain from '../pages/auth/RegisterMain';
import Profiles from '../pages/content/Profiles';
import Actions from '../pages/content/Actions';
import Roles from '../pages/content/roles/Index';
import RegisterRol from '../pages/content/roles/Register';
import Companies from '../pages/content/Companies';
import InfoCompanies from '../pages/content/InfoCompanies';
import ErrorPage from '../pages/ErrorPage';

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginMain />} />
      <Route path="/content" element={<ProtectedRoute element={<Layout />} />}>
        <Route path="index" element={<Index />} />
        <Route path="users" element={<Users />} />
        <Route path="users/register" element={<RegisterMain />} />
        <Route path="profiles" element={<Profiles />} />
        <Route path="actions" element={<Actions />} />
        <Route path="roles" element={<Roles />} />
        <Route path="roles/create" element={<RegisterRol />} />
        <Route path="companies" element={<Companies />} />
        <Route path="companies/detail/:companyId" element={<InfoCompanies />} />
      </Route>
      <Route path="*" element={<ErrorPage />} /> 
    </Routes>
  );
};

export default Router;
