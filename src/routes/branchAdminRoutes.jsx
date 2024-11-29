import { 
  BranchDashboard,
  BranchMenu,
  EmployeeList,
  EmployeeForm 
} from '../pages/admin/branch';
  
  export const branchAdminRoutes = [
    { path: '/admin/branch', element: <BranchDashboard /> },
    { 
      path: '/admin/branch/employees',
      children: [
        { path: '', element: <EmployeeList /> },
        { path: 'add', element: <EmployeeForm /> },
        { path: 'edit/:id', element: <EmployeeForm /> }
      ]
    },
    { path: '/admin/branch/menu', element: <BranchMenu /> }
  ];