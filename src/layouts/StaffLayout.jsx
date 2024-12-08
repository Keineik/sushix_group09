import { Children } from 'react';
import BaseLayout from './BaseLayout';

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
  return (
    <BaseLayout
      title="Staff"
      basePath="/staff"
      navItems={navItems}
    />
  );
};

export default StaffLayout;