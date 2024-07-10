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
    data.append('client_secret', 'N72WGYwOXapA6REUEztqnexkKs17P7SN');
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
        localStorage.setItem('clientid', "real-client")
        localStorage.setItem('clientsecret',"N72WGYwOXapA6REUEztqnexkKs17P7SN")
        navigate('/home');

      } else {
        const errorData = await response.json();
        console.log('Failed to authenticate', errorData);
      }
    } catch (error) {
      console.error('Login error', error);
    }
  };
  
  const handleLogin1 = async (e) => {
    e.preventDefault();

    const data = new URLSearchParams();
    data.append('client_id', 'cbac');
    data.append('client_secret', 'Z2mF9FWjjNIyLWKK2yj6xI3WQKp8q5ht');
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
        localStorage.setItem('clientid', "cbac")
        localStorage.setItem('clientsecret',"Z2mF9FWjjNIyLWKK2yj6xI3WQKp8q5ht")
        navigate('/home');

      } else {
        const errorData = await response.json();
        console.log('Failed to authenticate', errorData);
      }
    } catch (error) {
      console.error('Login error', error);
    }
  };
  const handleLogin2 = async (e) => {
    e.preventDefault();

    const data = new URLSearchParams();
    data.append('client_id', 'timebac');
    data.append('client_secret', 'nswPeSbsHZBH1MzNkNsiywIGef58LZM9');
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
        localStorage.setItem('clientid', "timebac")
        localStorage.setItem('clientsecret',"nswPeSbsHZBH1MzNkNsiywIGef58LZM9")
        navigate('/home');

      } else {
        const errorData = await response.json();
        console.log('Failed to authenticate', errorData);
      }
    } catch (error) {
      console.error('Login error', error);
    }
  };
  const handleLogin3 = async (e) => {
    e.preventDefault();

    const data = new URLSearchParams();
    data.append('client_id', 'ubac');
    data.append('client_secret', 'EvcRxovsGf8eFjuwldFhedPQ5JnQkYzK');
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
        localStorage.setItem('clientid', "ubac")
        localStorage.setItem('clientsecret',"EvcRxovsGf8eFjuwldFhedPQ5JnQkYzK")
        navigate('/home');

      } else {
        const errorData = await response.json();
        console.log('Failed to authenticate', errorData);
      }
    } catch (error) {
      console.error('Login error', error);
    }
  };
  const handleLogin4 = async (e) => {
    e.preventDefault();

    const data = new URLSearchParams();
    data.append('client_id', 'agbac');
    data.append('client_secret', 'xGUHNxbIGKKM0qjfU6cCEVNpXr9h4vzW');
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
        localStorage.setItem('clientid', "agbac")
        localStorage.setItem('clientsecret',"xGUHNxbIGKKM0qjfU6cCEVNpXr9h4vzW")
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
          <div className="login-container">
            <h1>LOGIN</h1>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" id="button-login" onClick={handleLogin}>LOGIN</button>
            <button type="submit" id="button-login" onClick={handleLogin1}>LOGIN Client-based-access-control </button>
            <button type="submit" id="button-login" onClick={handleLogin2}>LOGIN Time-based-access-control </button>
            <button type="submit" id="button-login" onClick={handleLogin3}>LOGIN User-based-access-control </button>
            <button type="submit" id="button-login" onClick={handleLogin4}>LOGIN Aggregat Time/Role </button>
          </div>
      </div>
    
  );
};

export default Login;
