import React, { useEffect, useState } from "react";
import Keycloak from "keycloak-js";

const Home = () => {
    const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const initKeycloak = async () => {
            const keycloakInstance = new Keycloak({
                url: 'http://localhost:8080',
                realm: 'master',
                clientId: 'real-client'
            });

            try {
                const authenticated = await keycloakInstance.init({ onLoad: 'login-required' });
                setKeycloak(keycloakInstance);
                setAuthenticated(authenticated);
            } catch (error) {
                console.error("Keycloak initialization failed", error);
            }
        };

        initKeycloak();

    }, []);

    if (!keycloak) {
        return <div>Loading Keycloak...</div>;
    }

    if (!authenticated) {
        return <div>Redirecting to login...</div>;
    }

    return (
        <div>
            Hello
            <button className="button-login" onClick={() => {keycloak.logout({redirectUri: 'http://localhost:5173/'})}}>Logout</button>
        </div>
    );
};

export default Home;
