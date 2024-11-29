// src/layouts/admin/CompanyAdminLayout.jsx
import BaseAdminLayout from './BaseAdminLayout';

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
    children: [
      { path: '', label: 'List', icon: 'list' },
      { path: 'add', label: 'Add New', icon: 'plus' }
    ]
  },
  {
    path: 'menu',
    label: 'Menu Management',
    icon: 'book',
    children: [
      { path: '', label: 'Items', icon: 'grid' },
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
    path: 'hr',
    label: 'HR',
    icon: 'people'
  }
];

const CompanyAdminLayout = () => {
  return (
    <BaseAdminLayout
      title="Company Admin"
      basePath="/admin/company"
      navItems={navItems}
    />
  );
};

export default CompanyAdminLayout;