import {
    StaffDashboard,
} from '../pages/private/staff';
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

];