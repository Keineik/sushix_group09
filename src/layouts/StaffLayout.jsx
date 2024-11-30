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