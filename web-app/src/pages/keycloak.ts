import Keycloak from 'keycloak-js';

const keycloak = Keycloak({
  url: 'http://localhost:8080', // URL zu Ihrem Keycloak-Server
  realm: 'master', // Name Ihres Realms
  clientId: 'real-client', // Client-ID Ihrer Anwendung
});

export default keycloak;
