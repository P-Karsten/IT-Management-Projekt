import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

//import ReactDOM from 'react-dom';
import App1 from './App';

import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './pages/keycloak';

//import keycloak from './keycloak';


/*keycloak.init({onLoad: 'login-required'}).then((authenticated) => {
  if (authenticated) {*/
  /*}
  else {
    window.location.reload()
  }
}).catch(() => {
  console.error('Failed to init kc')
})*/

/*
ReactDOM.createRoot(document.getElementById('root')!).render(

      
  <React.StrictMode >
        <App/>
  </React.StrictMode>
  
);
*/

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ReactKeycloakProvider authClient={keycloak}>
   <App />
      </ReactKeycloakProvider>
      
  
);


