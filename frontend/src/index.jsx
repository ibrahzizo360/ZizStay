import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SearchContextProvider } from './context/SearchContext';
import { AuthContextProvider } from './context/AuthContext';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <SearchContextProvider>
    <ToastContainer closeButton={false} autoClose={2000} />
      <App />
    </SearchContextProvider>  
    </AuthContextProvider>
  </React.StrictMode>
);
