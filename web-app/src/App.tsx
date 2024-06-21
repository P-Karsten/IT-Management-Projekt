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
      console.log("test1+")
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


function App1() {
  const { keycloak, initialized } = useKeycloak();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  
  // Initialisierungsstatus überprüfen
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
  const routes = router(isAuthenticated, setIsAuthenticated, setUserInfo);
  if (!initialized) {
    return <div>Loading...</div>;
  }

  // Authentifizierungsstatus überprüfen und Inhalte anzeigen
  return (
    <div>
      {keycloak.authenticated ? (
        <div>
          <p>Welcome {keycloak.tokenParsed?.preferred_username}!</p>
          <button className='button1' onClick={() => keycloak.logout()}>Logout</button>
        </div>
      ) : (
        <Router>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUserInfo={setUserInfo} />} />
        </Router>
      )}
    </div>
  );
};

export default App;
