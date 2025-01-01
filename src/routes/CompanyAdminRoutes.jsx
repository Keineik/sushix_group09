import {
  CompanyDashboard,
  BranchManagement,
  OrderManagement,
  OrderForm,
  BranchForm,
  ItemManagement,
  ComboManagement,
  CategoryManagement,
  MembershipManagement,
  MembershipForm,
  CouponManagement,
  CouponForm,
  HRManagement,
  HRForm,
  ItemForm,
  CategoryForm
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
        ]
      },
      {
        path: 'orders',
        children: [
            { path: '', element: <OrderManagement OrderType="Dine-In" /> },
            {
                path: 'delivery',
                children: [
                    { path: '', element: <OrderManagement OrderType="Delivery" />, },
                    { path: 'add', element: <OrderForm /> },
                    { path: 'edit/:id', element: <OrderForm /> },
                ]
            },
            {
                path: 'dine-in',
                children: [
                    { path: '', element: <OrderManagement OrderType="Dine-In" /> },
                    { path: 'add', element: <OrderForm /> },
                    { path: 'edit/:id', element: <OrderForm /> },
                ]
            }
        ]
      },
      {
        path: 'menu',
        children: [
          { path: '', element: <Navigate to="items" /> },
          { path: 'items', 
            children: [
              { path: '', element: <ItemManagement /> },
              { path: 'add', element: <ItemForm /> },
              { path: 'edit/:id', element: <ItemForm /> },
            ]
            
          },
          { 
            path: 'categories', 
            children: [
              { path: '', element: <CategoryManagement /> },
              { path: 'add', element: <CategoryForm /> },
              { path : 'edit/:id', element: <CategoryForm /> }
            ]
          },
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
