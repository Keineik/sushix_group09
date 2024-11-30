import {
  CompanyDashboard,
} from '../pages/private/company';
import PrivateRoute from '../components/PrivateRoute';


export const CompanyAdminRoutes = [
  {
    path: '/admin/company',
    element: (
      <PrivateRoute>
        <CompanyDashboard />
      </PrivateRoute>
    ),
  },

];