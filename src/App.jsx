import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext'; // Import AuthProvider
import {MainLayout, BranchAdminLayout, CompanyAdminLayout, StaffLayout} from './layouts';
import {PublicRoutes} from './routes/PublicRoutes';
import {BranchAdminRoutes} from './routes/BranchAdminRoutes';
import {CompanyAdminRoutes} from './routes/CompanyAdminRoutes';
import {StaffRoutes} from './routes/StaffRoutes';
import PrivateLogin from './pages/private/PrivateLogin';
import PrivateRoute from './components/PrivateRoute';
import Unauthorized from './pages/Unauthorized';

const router = createBrowserRouter([
    {
        element: (
            <AuthProvider>
                <MainLayout/>
            </AuthProvider>
        ), // Wrapping AuthProvider around the MainLayout
        children: PublicRoutes,
    },
    {
        element: (
            <PrivateRoute allowedRoles={['branch', 'company']}>
                <BranchAdminLayout/>
            </PrivateRoute>
        ),
        children: BranchAdminRoutes,
    },
    {
        element: (
            <PrivateRoute allowedRoles={['company']}>
                <CompanyAdminLayout/>
            </PrivateRoute>
        ),
        children: CompanyAdminRoutes,
    },
    {
        element: (
            <PrivateRoute allowedRoles={['staff']}>
                <StaffLayout/>
            </PrivateRoute>
        ),
        children: StaffRoutes,
    },
    {
        path: '/private-login',
        element: <PrivateLogin/>,
    },
    {
        path: '/admin',
        element: (
            <PrivateRoute allowedRoles={['company', 'branch']}>
                <div/>
            </PrivateRoute>
        ),
    },
    {
        path: '/unauthorized',
        element: <Unauthorized/>,
    },
]);

const App = () => {
    return (
        <RouterProvider router={router}/>
    );
};

export default App;