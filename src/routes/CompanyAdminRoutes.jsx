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
  HRForm
} from '../pages/private/company';


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
          { path: '', element: <ItemManagement /> },
          { path: 'items', element: <ItemManagement /> },
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
