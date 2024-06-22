// App.tsx
import { RouterProvider } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import router from '../routes/Router';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { useKeycloak } from '@react-keycloak/web';
import Login from './pages/Login';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  

  const checkAuthentication = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Validate the token if necessary
      setIsAuthenticated(true);
      
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      setUserInfo(userInfo);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const routes = router(isAuthenticated, setIsAuthenticated, setUserInfo);

  return (
    
        <RouterProvider router={routes} />
    
  );
}


export default App;
