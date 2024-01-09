import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Landing />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    }
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
