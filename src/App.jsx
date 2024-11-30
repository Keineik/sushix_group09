import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout, BranchAdminLayout, CompanyAdminLayout, StaffLayout } from './layouts';
import { PublicRoutes } from './routes/PublicRoutes';
import { BranchAdminRoutes } from './routes/BranchAdminRoutes';
import { CompanyAdminRoutes } from './routes/CompanyAdminRoutes';
import { StaffRoutes } from './routes/StaffRoutes';
import PrivateLogin from './pages/private/PrivateLogin';
import PrivateRoute from './components/PrivateRoute';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: PublicRoutes
  },
  {
    element: <BranchAdminLayout />,
    children: BranchAdminRoutes
  },
  {
    element: <CompanyAdminLayout />,
    children: CompanyAdminRoutes
  },
  {
    element: <StaffLayout />,
    children: StaffRoutes
  },
  {
    path: '/private-login',
    element: <PrivateLogin />,
  },
  {
    path: '/admin',
    element: (
      <PrivateRoute>
        <div />
      </PrivateRoute>
    )
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}