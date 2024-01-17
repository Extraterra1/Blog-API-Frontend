import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import React from 'react';
import ProtectRoute from './components/ProtectRoute';

import Landing from './views/Landing';
import Login from './views/Login';
import Register from './views/Register';
import UserDashboard from './views/UserDashboard';
import PostView from './views/PostView';
import CreatePost from './views/CreatePost';
import EditPost from './views/EditPost';

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
      path: '/posts/create',
      element: (
        <ProtectRoute>
          <CreatePost />
        </ProtectRoute>
      )
    },
    {
      path: '/posts/edit',
      element: (
        <ProtectRoute>
          <EditPost />
        </ProtectRoute>
      )
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
        <ProtectRoute>
          <UserDashboard />
        </ProtectRoute>
      )
    }
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
