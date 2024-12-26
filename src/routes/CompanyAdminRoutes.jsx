import {
  CompanyDashboard,
  BranchManagement,
  BranchForm,
  BranchDetails,
  ItemManagement,
  ComboManagement,
  CategoryManagement,
  MembershipManagement,
  MembershipForm,
  CouponManagement,
  CouponForm,
  HRManagement,
  HRForm,
  ItemEditForm
} from '../pages/private/company';
import { Navigate } from 'react-router-dom';


export const CompanyAdminRoutes = [
  {
    path: '/admin/company',
    children: [
      { path: '', element: <CompanyDashboard /> },
      {
        path: 'branches',
        children: [
          { path: '', element: <BranchManagement /> },
          { path: 'add', element: <BranchForm /> },
          { path: 'edit/:id', element: <BranchForm /> },
          { path: 'details/:id', element: <BranchDetails /> }
        ]
      },
      {
        path: 'menu',
        children: [
          { path: '', element: <Navigate to="items" /> },
          { path: 'items', 
            children: [
              { path: '', element: <ItemManagement /> },
              { path: 'edit/:id', element: <ItemEditForm /> },
            ]
            
          },
          { path: 'categories', element: <CategoryManagement /> },
          { path: 'combos', element: <ComboManagement /> }
        ]
      },
      {
        path: 'membership',
        children: [
          { path: '', element: <MembershipManagement /> },
          { path: 'add', element: <MembershipForm /> },
          { path: 'edit/:id', element: <MembershipForm /> }
        ]
      },
      {
        path: 'coupon',
        children: [
          { path: '', element: <CouponManagement /> },
          { path: 'add', element: <CouponForm /> },
          { path: 'edit/:id', element: <CouponForm /> }
        ]
      },
      {
        path: 'hr',
        children: [
          { path: '', element: <HRManagement /> },
          { path: 'add', element: <HRForm /> },
          { path: 'edit/:id', element: <HRForm /> }
        ]
      }
    ]
  },
];
