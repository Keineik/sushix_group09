import Navbar from './components/Navbar.jsx'
import NavbarDown from './components/NavbarDown.jsx'
import Hero from './components/hero.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';

import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements} from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<Home />} />
      {/* <Route path='/example1' element={<Example1 />} /> */}
    </Route>
  )
);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;