import {
  BranchDashboard,
  BranchMenu,
  BranchStaff,
  StaffForm,
  BranchCustomer,
  BranchOrder,
  BranchInvoice,
  OrderForm,
  CustomerForm,
  BranchReservation
} from '../pages/private/branch';

export const BranchAdminRoutes = [
  {
    path: '/admin/branch',
    children: [
      {
        path: '',
        element: (
            <BranchDashboard />
        )
      },
      {
        path: 'staffs',
        children: [
          { path: '', element: <BranchStaff /> },
          { path: 'add', element: <StaffForm /> },
          { path: 'edit/:id', element: <StaffForm /> }
        ]
      },
      { path: 'menu', element: <BranchMenu /> }, 
      {
        path: 'customers',
        children: [
          { path: '', element: <BranchCustomer /> },
          { path: 'add', element: <CustomerForm /> },
          { path: 'edit/:id', element: <CustomerForm /> }
        ]
      },
      {
        path: 'reservations',
        element: <BranchReservation />
      },
      {
        path: 'orders',
        children: [
          { path: '', element: <BranchOrder OrderType="Dine-In" />},
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
              { path: '', element: <BranchOrder OrderType="Dine-In" /> },
              { path: 'add', element: <OrderForm /> },
              { path: 'edit/:id', element: <OrderForm /> },
            ]
          }
        ]
      },
      { path: 'invoice', element: <BranchInvoice /> },
    ]
  }
];