import BaseLayout from './BaseLayout';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const navItems = [
  {
    path: '',
    label: 'Dashboard',
    icon: 'house'
  },
  {
    path: 'staffs',
    label: 'Staffs',
    icon: 'people'
  },
  {
    path: 'menu',
    label: 'Menu',
    icon: 'book'
  },
  {
    path: 'customers',
    label: 'Customers',
    icon: 'person'
  },
  {
    path: 'reservations',
    label: 'Reservations',
    icon: 'calendar-check'
  },
  {
    path: 'orders',
    label: 'Orders',
    icon: 'list-ol',
    children: [
      {
        path: 'dine-in',
        label: 'Dine In',
        icon: 'person-wheelchair'
      },
      {
        path: 'delivery',
        label: 'Delivery',
        icon: 'truck'
      }
    ]
  },
  {
    path: 'invoice',
    label: 'Invoice',
    icon: 'receipt'
  }
];

const BranchAdminLayout = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <BaseLayout
      title={`${user.staff.department.branch.branchName}. Staff Manager`}
      basePath={`/admin/branch`}
      navItems={navItems}
      name={user.username}
      logout={logout}
    />
  );
};

export default BranchAdminLayout;