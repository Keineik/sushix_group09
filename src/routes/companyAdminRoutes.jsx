import {
  CompanyDashboard,
  BranchManagement,
  BranchForm,
  BranchDetails,
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
  {
    path: '/admin/company/branches',
    children: [
      { path: '', element: <BranchManagement /> },
      { path: 'add', element: <BranchForm /> },
      { path: 'edit/:id', element: <BranchForm /> },
      { path: 'details/:id', element: <BranchDetails /> }
    ]
  }
];