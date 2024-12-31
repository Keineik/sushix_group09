import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MainLayout, BranchAdminLayout, CompanyAdminLayout, StaffLayout } from './layouts';
import { PublicRoutes } from './routes/PublicRoutes';
import { BranchAdminRoutes } from './routes/BranchAdminRoutes';
import { CompanyAdminRoutes } from './routes/CompanyAdminRoutes';
import { StaffRoutes } from './routes/StaffRoutes';
import PrivateRoute from './components/PrivateRoute';
import Unauthorized from './pages/Unauthorized';

const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    ),
    children: PublicRoutes,
  },
  {
    element: (
      <AuthProvider>
        <PrivateRoute allowedRoles={['STAFF MANAGER', 'ADMIN']}>
          <BranchAdminLayout />
        </PrivateRoute>
      </AuthProvider>

    ),
    children: BranchAdminRoutes,
  },
  {
    element: (
      <AuthProvider>
        <PrivateRoute allowedRoles={['ADMIN']}>
          <CompanyAdminLayout />
        </PrivateRoute>
      </AuthProvider>
    ),
    children: CompanyAdminRoutes,
  },
  {
    element: (
      <AuthProvider>
        <PrivateRoute allowedRoles={['STAFF']}>
          <StaffLayout />
        </PrivateRoute>
      </AuthProvider>

    ),
    children: StaffRoutes,
  },
  {
    path: '/admin',
    element: (
      <AuthProvider>
        <PrivateRoute allowedRoles={['ADMIN', 'STAFF MANAGER']}>
          <div />
        </PrivateRoute>
      </AuthProvider>

    ),
  },
  {
    path: '/unauthorized',
    element: <Unauthorized />,
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;