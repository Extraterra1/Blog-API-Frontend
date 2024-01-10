import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RequireAuth } from 'react-auth-kit';

import React from 'react';

import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import UserDashboard from './views/UserDetail';

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
    },
    {
      path: '/user',
      element: (
        <RequireAuth fallbackPath="/login">
          <UserDashboard />
        </RequireAuth>
      )
    }
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
