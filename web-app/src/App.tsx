// App.tsx
import { RouterProvider } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import router from '../routes/Router';
import './App.css';

import { useKeycloak } from '@react-keycloak/web';

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



const App1: React.FC = () => {
  const { keycloak, initialized } = useKeycloak();

  // Initialisierungsstatus überprüfen
  if (!initialized) {
    return console.log("app1 1re");
  }

  // Authentifizierungsstatus überprüfen und Inhalte anzeigen
  return (
    <div>
      {keycloak.authenticated ? (
        <div>
          <p>Welcome {keycloak.tokenParsed?.preferred_username}!</p>
          <button onClick={() => keycloak.logout()}>Logout</button>
        </div>
      ) : (
        <button onClick={() => keycloak.login()}>Login</button>
      )}
    </div>
  );
};

export default App;
