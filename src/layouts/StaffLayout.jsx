import { useContext } from 'react';
import BaseLayout from './BaseLayout';
import { AuthContext } from '../context/AuthContext';

const navItems = [
  {
    path: '',
    label: 'Dashboard',
    icon: 'house'
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

const StaffLayout = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <BaseLayout
    title={`${user.staff.department.branch.branchName}. Staff ${user.staff.department.deptName}`}
      basePath="/staff"
      navItems={navItems}
      logout={logout}
      name={user.username}
    />
  );
};

export default StaffLayout;