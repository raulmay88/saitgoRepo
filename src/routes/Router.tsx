// Router.tsx
import { Routes, Route } from 'react-router-dom';
import LoginMain from '../pages/auth/LoginMain';
import Layout from '../layouts/Layout';
import ProtectedRoute from '../auth/protectedRoute';
import Index from "../pages/content/Index";
import Users from '../pages/content/users/Index';
import CreateUser from '../pages/content/users/Create';
import DetailUser from '../pages/content/users/Detail';
import Actions from '../pages/content/Actions';
import Roles from '../pages/content/roles/Index';
import CreateRoles from '../pages/content/roles/Create';
import EditRoles from '../pages/content/roles/Edit';
import DetailRoles from '../pages/content/roles/Detail';
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
        <Route path="users/create" element={<CreateUser />} />
        <Route path="users/detail/:userId" element={<DetailUser />} />
        <Route path="roles" element={<Roles />} />
        <Route path="roles/create" element={<CreateRoles />} />
        <Route path="roles/edit/:roleId" element={<EditRoles />} />
        <Route path="roles/detail/:roleId" element={<DetailRoles />} />
        <Route path="actions" element={<Actions />} />
        <Route path="companies" element={<Companies />} />
        <Route path="companies/detail/:companyId" element={<InfoCompanies />} />
      </Route>
      <Route path="*" element={<ErrorPage />} /> 
    </Routes>
  );
};

export default Router;
