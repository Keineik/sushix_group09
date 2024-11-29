// src/layouts/admin/BranchAdminLayout.jsx
import BaseAdminLayout from './BaseAdminLayout';

const navItems = [
  {
    path: '',
    label: 'Dashboard',
    icon: 'house'
  },
  {
    path: 'employees',
    label: 'Employees',
    icon: 'people',
    children: [
      { path: '', label: 'List', icon: 'list' },
      { path: 'add', label: 'Add New', icon: 'plus' }
    ]
  },
  {
    path: 'menu',
    label: 'Menu',
    icon: 'book'
  },
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