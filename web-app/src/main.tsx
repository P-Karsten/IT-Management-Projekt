import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

//import ReactDOM from 'react-dom';
import App1 from './App';
import keycloak from './pages/keycloak';
import { ReactKeycloakProvider } from '@react-keycloak/web';

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


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <App1 />
  </React.StrictMode>
);

/*
ReactDOM.render(
  <ReactKeycloakProvider authClient={keycloak}>
   <App1 />
      </ReactKeycloakProvider>,
  document.getElementById('root')
);
*/

