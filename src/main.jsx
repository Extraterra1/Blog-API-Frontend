import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import WebFont from 'webfontloader';
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit/AuthProvider';
import './index.css';

const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:'
});

WebFont.load({
  google: {
    families: ['Oswald:300,400,700', 'Rubik Doodle Shadow:400', 'Playfair Display:400,500,700']
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <Router />
    </AuthProvider>
  </React.StrictMode>
);
