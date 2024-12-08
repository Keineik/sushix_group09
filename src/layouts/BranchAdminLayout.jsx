import BaseLayout from './BaseLayout';
import { useParams } from 'react-router-dom';

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
  const { branchId } = useParams();

  return (
    <BaseLayout
      title="Branch Admin"
      basePath={`/admin/branch/${branchId}`}
      navItems={navItems}
    />
  );
};

export default BranchAdminLayout;