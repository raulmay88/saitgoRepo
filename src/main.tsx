import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router'; 
import { ToastContainer } from 'react-toastify';
import { LoadingProvider } from './context/LoadingContext';
import GlobalSpinner from './pages/GlobalSpinner';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoadingProvider>
      <BrowserRouter>
        <Router />
        <ToastContainer />
        <GlobalSpinner />
      </BrowserRouter>
    </LoadingProvider>
  </React.StrictMode>
);
