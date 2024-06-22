import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './login.css';



const Login = ({ setIsAuthenticated, setUserInfo }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [acc_token, setAccToken] = useState()

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = new URLSearchParams();
    data.append('client_id', 'real-client');
    data.append('client_secret', '4h8j9GtggcdUyGYtQcFVlFNS7pEKMLaY');
    data.append('username', username);
    data.append('password', password);
    data.append('grant_type', 'password');
    
    try {
      const response = await fetch("http://localhost:8080/realms/master/protocol/openid-connect/token", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Origin': 'http://localhost:5173'
        },
        body: data.toString()
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Authenticated', result); 
        localStorage.setItem('accessToken', result.access_token);
        setAccToken(result.access_token)
        navigate('/home');

      } else {
        const errorData = await response.json();
        console.log('Failed to authenticate', errorData);
      }
    } catch (error) {
      console.error('Login error', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div className="login-container">
          <h1>LOGIN</h1>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" id="button-login">LOGIN</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
