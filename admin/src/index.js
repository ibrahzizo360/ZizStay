import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DarkModeContextProvider } from "./context/darkModeContext";
import { AuthContextProvider } from './context/AuthContext';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <DarkModeContextProvider>
    <ToastContainer closeButton={false} autoClose={2000} />
      <App />
    </DarkModeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
