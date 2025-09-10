import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './global.css';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
  </StrictMode>
);
