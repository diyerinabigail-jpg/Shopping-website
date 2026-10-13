import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ShopProvider } from './context/ShopContext.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ShopProvider>
      <App />
    </ShopProvider>
  </React.StrictMode>,
);
