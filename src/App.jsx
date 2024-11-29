import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout, BranchAdminLayout, CompanyAdminLayout } from './layouts';
import { publicRoutes } from './routes/publicRoutes';
import { branchAdminRoutes } from './routes/branchAdminRoutes';
import { companyAdminRoutes } from './routes/companyAdminRoutes';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: publicRoutes
  },
  {
    element: <BranchAdminLayout />,
    children: branchAdminRoutes
  },
  {
    element: <CompanyAdminLayout />,
    children: companyAdminRoutes
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}