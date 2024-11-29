import { 
  BranchDashboard,
  BranchMenu,
  Branch,
  StaffForm,
  BranchCustomer,
  BranchOrder,
  BranchInvoice
} from '../pages/admin/branch';
  
  export const branchAdminRoutes = [
    { path: '/admin/branch', element: <BranchDashboard /> },
    { 
      path: '/admin/branch/staffs',
      children: [
        { path: '', element: <Branch /> },
        { path: 'add', element: <StaffForm /> },
        { path: 'edit/:id', element: <StaffForm /> }
      ]
    },
    { path: '/admin/branch/menu', element: <BranchMenu /> },
    { path: '/admin/branch/customers', element: <BranchCustomer /> },
    { path: '/admin/branch/orders', element: <BranchOrder /> },
    { path: '/admin/branch/invoice', element: <BranchInvoice /> },
  ];