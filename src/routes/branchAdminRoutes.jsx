import {
  BranchDashboard,
  BranchMenu,
  Branch,
  StaffForm,
  BranchCustomer,
  BranchOrder,
  BranchInvoice,
  OrderForm,
  CustomerForm,
  BranchReservation
} from '../pages/private/branch';
import PrivateRoute from '../components/PrivateRoute';

export const BranchAdminRoutes = [
  {
    path: '/admin/branch',
    element: (
      <PrivateRoute>
        <BranchDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: '/admin/branch/staffs',
    children: [
      { path: '', element: <Branch /> },
      { path: 'add', element: <StaffForm /> },
      { path: 'edit/:id', element: <StaffForm /> }
    ]
  },
  { path: '/admin/branch/menu', element: <BranchMenu /> },

  {
    path: '/admin/branch/customers',
    children: [
      { path: '', element: <BranchCustomer /> },
      { path: 'add', element: <CustomerForm /> },
      { path: 'edit/:id', element: <CustomerForm /> }
    ]
  },

  {
    path: '/admin/branch/reservations',
    element: <BranchReservation />
  },

  {
    path: '/admin/branch/orders',
    children: [
      { path: '', element: <BranchOrder OrderType="Dine-In" /> },
      {
        path: 'delivery',
        children: [
          { path: '', element: <BranchOrder OrderType="Delivery" />, },
          { path: 'add', element: <OrderForm /> },
          { path: 'edit/:id', element: <OrderForm /> },
        ]
      },
      {
        path: 'dine-in',
        children: [
          { path: '', element: <BranchOrder OrderType="Dine-In" />},
          { path: 'add', element: <OrderForm /> },
          { path: 'edit/:id', element: <OrderForm /> },
        ]
      }
    ]
  },

  { path: '/admin/branch/invoice', element: <BranchInvoice /> },
];