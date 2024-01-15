import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RequireAuth } from 'react-auth-kit';

import React from 'react';

import Landing from './views/Landing';
import Login from './views/Login';
import Register from './views/Register';
import UserDashboard from './views/UserDashboard';
import PostView from './views/PostView';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Landing />
    },
    {
      path: '/posts/:id',
      element: <PostView />
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
