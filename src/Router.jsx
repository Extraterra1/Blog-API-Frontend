import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Landing from './components/Landing';
import Login from './components/Login';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Landing />
    },
    {
      path: '/login',
      element: <Login />
    }
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
