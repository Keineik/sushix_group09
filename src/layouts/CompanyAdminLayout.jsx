import BaseLayout from './BaseLayout';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const navItems = [
  {
    path: '',
    label: 'Dashboard',
    icon: 'house'
  },
  {
    path: 'branches',
    label: 'Branches',
    icon: 'building',
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
    path: 'menu',
    label: 'Menu Management',
    icon: 'book',
    children: [
      { path: 'items', label: 'Items', icon: 'grid' },
      { path: 'categories', label: 'Categories', icon: 'tags' },
      { path: 'combos', label: 'Combos', icon: 'box' }
    ]
  },
  {
    path: 'membership',
    label: 'Membership',
    icon: 'trophy'
  },
  {
    path: 'coupon',
    label: 'Coupon',
    icon: 'ticket'
  },
  {
    path: 'hr',
    label: 'HR',
    icon: 'people'
  }
];

const CompanyAdminLayout = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <BaseLayout
      title="Company Admin"
      basePath="/admin/company"
      navItems={navItems}
      name={user.username}
      logout={logout}
    />
  );
};

export default CompanyAdminLayout;