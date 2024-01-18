import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router.jsx';
import { AuthProvider } from 'react-auth-kit';

import WebFont from 'webfontloader';
import { Toaster } from 'react-hot-toast';

import './index.css';

WebFont.load({
  google: {
    families: ['Oswald:300,400,700', 'Rubik Doodle Shadow:400', 'Playfair Display:400,500,700']
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider authType="cookie" authName="_auth" cookieDomain={window.location.hostname}>
      <Toaster toastOptions={{ style: { fontSize: '1.5rem', fontWeight: '400', fontFamily: 'Oswald', marginTop: '3rem' } }} />
      <Router />
    </AuthProvider>
  </React.StrictMode>
);
