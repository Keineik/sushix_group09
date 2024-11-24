import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Branches from "./pages/Branches.jsx";
import Promotions from "./pages/Promotions.jsx";
import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements} from 'react-router-dom'
import Menu from './pages/Menu.jsx';

// mau do #d20903

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/menu' element={<Menu />} />
      <Route path='/branches' element={<Branches />} />
      <Route path='/promotions' element={<Promotions />} />
    </Route>
  )
);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;