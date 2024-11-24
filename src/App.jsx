import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Branches from "./pages/Branches.jsx";
import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements} from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/branches' element={<Branches />} />
    </Route>
  )
);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;