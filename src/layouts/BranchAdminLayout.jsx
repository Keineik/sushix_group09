// src/layouts/admin/BranchAdminLayout.jsx
import BaseAdminLayout from './BaseAdminLayout';

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
    path: 'orders',
    label: 'Orders',
    icon: 'list-ol'
  },
  {
    path: 'invoice',
    label: 'Invoice',
    icon: 'receipt'
  }
];

const BranchAdminLayout = () => {
  return (
    <BaseAdminLayout
      title="Branch Admin"
      basePath="/admin/branch"
      navItems={navItems}
    />
  );
};

export default BranchAdminLayout;