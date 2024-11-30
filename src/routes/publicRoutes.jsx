import { 
  Home,
  About,
  Menu,
  Branches, 
  Promotions,
  Reservation,
  Register,
  Login
} from '../pages/public';


export const PublicRoutes = [
  { 
    path: '/',
    element: <Home />,
    errorElement: <div>Error loading home page</div>
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/menu', 
    element: <Menu />,
  },
  {
    path: '/branches',
    element: <Branches />,
  },
  {
    path: '/promotions',
    element: <Promotions />,
  },
  {
    path: '/reservation',
    element: <Reservation />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  }
];