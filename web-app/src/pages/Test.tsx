// RevokeToken.tsx

import keycloak from './keycloak';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const RevokeToken = () => {

 const navigate = useNavigate();
  const revokeToken = async () => {
    const storedToken = localStorage.getItem('accessToken')!;

    const clientId = localStorage.getItem('clientid')!;  
    const clientSecret = localStorage.getItem('clientsecret');  

    try {
      const response = await fetch('http://localhost:8080/realms/master/protocol/openid-connect/revoke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`
        },
        body: new URLSearchParams({
          'token': storedToken,
          'token_type_hint': 'access_token'
        })
      });

      if (response.ok) {
        console.log('Access token revoked successfully');
        navigate('/login');
  	
      } else {
        console.log('Failed to revoke access token');
      }
    } catch (error) {
      console.error('Error revoking token:', error);
    }
  };

  return (
    <button className='button-group' onClick={revokeToken}>Logout</button>
  );
};

export default RevokeToken;
