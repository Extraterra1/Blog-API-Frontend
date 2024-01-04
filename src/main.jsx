import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import WebFont from 'webfontloader';
import './index.css';

WebFont.load({
  google: {
    families: ['Oswald:400,700', 'Rubik Doodle Shadow:400', 'Playfair Display:400,500,700']
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
