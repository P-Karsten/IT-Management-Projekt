import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './login.css';



import ReactDOM from 'react-dom';
import App1 from '../App';
import keycloak from './keycloak';
import { ReactKeycloakProvider } from '@react-keycloak/web';


const Login = ({ setIsAuthenticated, setUserInfo }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = new URLSearchParams();
    data.append('client_id', 'real-client');
    data.append('client_secret', 'N72WGYwOXapA6REUEztqnexkKs17P7SN');
    data.append('username', username);
    data.append('password', password);
    data.append('grant_type', 'password');
    
    
/*ReactDOM.render(
  <ReactKeycloakProvider authClient={keycloak}>
   <App />
      </ReactKeycloakProvider>,
  document.getElementById('root')
);*/
    
    
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

        fetchUserId(result.access_token);
      } else {
        const errorData = await response.json();
        console.log('Failed to authenticate', errorData);
      }
    } catch (error) {
      console.error('Login error', error);
    }
  };
  
  



  
  
  
  

  const fetchUserId = async (token) => {
    try {
      const response = await fetch(`http://localhost:8080/admin/realms/master/users?username=${username}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const users = await response.json();
        if (users.length > 0) {
          const user = users[0];
          fetchUserInfo(user.id, token);
        } else {
          console.log('User not found');
        }
      } else {
        console.log('Failed to fetch user ID');
      }
    } catch (error) {
      console.error('Fetch user ID error', error);
    }
  };

  const fetchUserInfo = async (userId, token) => {
    try {
      const userResponse = await fetch(`http://localhost:8080/admin/realms/master/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const groupsResponse = await fetch(`http://localhost:8080/admin/realms/master/users/${userId}/groups`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const rolesResponse = await fetch(`http://localhost:8080/admin/realms/master/users/${userId}/role-mappings/realm`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (userResponse.ok && groupsResponse.ok && rolesResponse.ok) {
        const user = await userResponse.json();
        const groups = await groupsResponse.json();
        const roles = await rolesResponse.json();

        const userInfo = {
          username: user.username,
          id: user.id,
          roles: roles.map(role => role.name),
          groups: groups.map(group => group.name)
        };

        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        setUserInfo(userInfo);
        setIsAuthenticated(true);

        navigate('/home');
      } else {
        console.log('Failed to fetch user information');
      }
    } catch (error) {
      console.error('Fetch user info error', error);
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
