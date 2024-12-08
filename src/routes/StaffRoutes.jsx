import {
    StaffDashboard,
} from '../pages/private/staff';
import {
    BranchOrder,
    BranchInvoice,
    BranchReservation,
    OrderForm
} from '../pages/private/branch';
import PrivateRoute from '../components/PrivateRoute';


export const StaffRoutes = [
    {
        path: '/staff',
        element: (
            <PrivateRoute>
                <StaffDashboard />
            </PrivateRoute>
        ),
    },
    {
        path: '/staff/reservations',
        element: <BranchReservation />
    },

    {
        path: '/staff/orders',
        children: [
            { path: '', element: <BranchOrder OrderType="Dine-In" /> },
            {
                path: 'delivery',
                children: [
                    { path: '', element: <BranchOrder OrderType="Delivery" />, },
                    { path: 'add', element: <OrderForm /> },
                    { path: 'edit/:id', element: <OrderForm /> },
                ]
            },
            {
                path: 'dine-in',
                children: [
                    { path: '', element: <BranchOrder OrderType="Dine-In" /> },
                    { path: 'add', element: <OrderForm /> },
                    { path: 'edit/:id', element: <OrderForm /> },
                ]
            }
        ]
    },

    { path: '/staff/invoice', element: <BranchInvoice /> },
];