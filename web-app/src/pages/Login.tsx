import React from "react";
import { useState } from 'react';
import './login.css';
import { useNavigate } from "react-router-dom";
import Keycloak from "keycloak-js";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const mail = document.getElementsByClassName('input-email');
    const paswd = document.getElementsByClassName('input-password');


    const kc = new Keycloak ({
        url: 'http://localhost:8080',
        realm: 'master',
        clientId: 'real-client',
    });

    kc.init({
        onLoad: 'login-required',
        checkLoginIframe: true,
        pkceMethod: 'S256'
    })


    return (
        <div className="container-login">
            <input type="email" placeholder="Email" className="input-email"/>
            <input type="password" placeholder="Password" className="input-password" />
            <button className="button-login">LogIn</button>
        </div>
    );
};

export default Login