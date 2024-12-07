import { element } from 'prop-types';
import { 
  Home,
  About,
  Menu,
  Branches, 
  Promotions,
  Reservation,
  Register,
  Login,
  ItemInfo,
  DeliveryTrackingPage,
  Profile,
  Membershipcards,
  Account,
  RewardHistory,
  CardsPolicy,
  LookupCards,
  Checkout
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
    children: [
      { path: '', element: <Menu /> }, 
      { path: 'item/:id', element: <ItemInfo /> }, 
    ],
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
  },
  {
    path: '/membershipcards',
    element : <Membershipcards />,
    children: [
      { path: '', element: < CardsPolicy/> }, 
      { path: 'cardspolicy', element: <CardsPolicy /> },
      { path: 'lookupcards', element: <LookupCards /> },
    ]
  },
  {
    path: '/account',
    element: <Account />, 
    children: [
      { path: '', element: <Profile /> }, 
      { path: 'profile', element: <Profile /> },
      { path: 'deliverytracking', element: <DeliveryTrackingPage /> },
      { path: 'rewardhistory', element: <RewardHistory /> },
    ],
  },

  {
    path: '/checkout',
    element: <Checkout />,
  },
];