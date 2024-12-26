import BaseLayout from './BaseLayout';

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
  return (
    <BaseLayout
      title="Company Admin"
      basePath="/admin/company"
      navItems={navItems}
    />
  );
};

export default CompanyAdminLayout;