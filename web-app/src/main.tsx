import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

//import ReactDOM from 'react-dom';
import App1 from './App';

import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './pages/keycloak';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <ReactKeycloakProvider authClient={keycloak}>
   <App />
      </ReactKeycloakProvider>
      
  
);


