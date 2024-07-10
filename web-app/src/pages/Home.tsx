// Home.tsx
import React, { useEffect, useState } from "react";
import VideoLoader from "../components/video/VideoLoader";
import './home.css';
import keycloak from './keycloak';
import { useNavigate } from 'react-router-dom';
import RevokeToken from './Test';


const Home = () => {
  const [token, setToken] = useState<string | null>(null);
  const [videoPathsAdmin, setVideoPathsAdmin] = useState<string[]>([]);
  const [videoPathsPremium, setVideoPathsPremium] = useState<string[]>([]);
  const [videoPathsUser, setVideoPathsUser] = useState<string[]>([]);
  const [author, setAuthor] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    setToken(storedToken);

    const checkAccess = async (token: string | null) => {
     
      var   clientid = localStorage.getItem('clientid')!;
      if (!token) return;
      
      const resourceAdmin = 'Videos2';
      const resourcePremium = 'Videos1';
      const resourceUser = 'Videos0';

      //Admin Videos
      try {
        const response = await fetch('http://localhost:8080/realms/master/protocol/openid-connect/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
          },
          body: new URLSearchParams({
            'grant_type': 'urn:ietf:params:oauth:grant-type:uma-ticket',
            'audience': clientid,
            'permission': resourceAdmin
          })
        });

        if (response.ok) {
          setAuthor(true);
          const data = await response.json();
          console.log('Admin access granted:', data);
          loadAdminVideos();
        } else {
          console.log('Admin access denied');
          
        }
      } catch (error) {
        console.error('Error checking admin access:', error);
      }

    //Premium Videos
    try {
      const response = await fetch('http://localhost:8080/realms/master/protocol/openid-connect/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`
        },
        body: new URLSearchParams({
          'grant_type': 'urn:ietf:params:oauth:grant-type:uma-ticket',
          'audience': clientid,
          'permission': resourcePremium
        })
      });

      if (response.ok) {
        setAuthor(true);
        const data = await response.json();
        console.log('Premium access granted:', data);
        loadPremiumVideos();
      } else {
        console.log('Premium access denied');
        
      }
      } catch (error) {
        console.error('Error checking premium access:', error);
      }
    //User Videos
        try {
          const response = await fetch('http://localhost:8080/realms/master/protocol/openid-connect/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Bearer ${token}`
            },
            body: new URLSearchParams({
              'grant_type': 'urn:ietf:params:oauth:grant-type:uma-ticket',
              'audience': clientid,
              'permission': resourceUser
            })
          });
    
          if (response.ok) {
            setAuthor(true);
            const data = await response.json();
            console.log('User access granted:', data);
            loadUserVideos();
          } else {
            console.log('User access denied');
            navigate('/login');
            
          }
        } catch (error) {
          console.error('Error checking user access:', error);
        }
  };

    const loadPremiumVideos = () => {
      const videoFiles: string[] = ['VideoB.mp4']; // VideoFile names

      const repeatedVideoFiles = videoFiles.flatMap(file => Array.from({ length: 3}, () => file));

      for (let i = repeatedVideoFiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [repeatedVideoFiles[i], repeatedVideoFiles[j]] = [repeatedVideoFiles[j], repeatedVideoFiles[i]];
      }

      setVideoPathsPremium(repeatedVideoFiles.map(file => `/videos/${file}`));
    };

    const loadUserVideos = () => {
      const videoFiles: string[] = [ 'VideoA.mp4']; // VideoFile names

      const repeatedVideoFiles = videoFiles.flatMap(file => Array.from({ length: 3 }, () => file));

      for (let i = repeatedVideoFiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [repeatedVideoFiles[i], repeatedVideoFiles[j]] = [repeatedVideoFiles[j], repeatedVideoFiles[i]];
      }

      setVideoPathsUser(repeatedVideoFiles.map(file => `/videos/${file}`));
    };

    const loadAdminVideos = () => {
      const videoFiles: string[] = ['VideoC.mp4']; // VideoFile names

      const repeatedVideoFiles = videoFiles.flatMap(file => Array.from({ length: 3 }, () => file));

      for (let i = repeatedVideoFiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [repeatedVideoFiles[i], repeatedVideoFiles[j]] = [repeatedVideoFiles[j], repeatedVideoFiles[i]];
      }

      setVideoPathsAdmin(repeatedVideoFiles.map(file => `/videos/${file}`));
    };



    checkAccess(storedToken);
  }, []);

  return (
    
     
    <div className="container-main">
      <div className="container-popular flexCol">
        <div className="Hline">ADMIN</div>
        <div className="videos flexRow">
          {videoPathsAdmin.map((videoPath, index) => (
            <div key={index} className="video">
              <VideoLoader srcPath={videoPath} />
              <h3>{videoPath}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="container-new flexCol">
        <div className="Hline">PREMIUM</div>
        <div className="videos flexRow">
          {videoPathsPremium.map((videoPath, index) => (
            <div key={index} className="video">
              <VideoLoader srcPath={videoPath} />
              <h3>{videoPath}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="container-user flexCol">
        <div className="Hline">USER</div>
        <div className="videos flexRow">
          {videoPathsUser.map((videoPath, index) => (
            <div key={index} className="video">
              <VideoLoader srcPath={videoPath} />
              <h3>{videoPath}</h3>
            </div>
          ))}
          
        </div>
        
      </div>
      <RevokeToken onClick= {() => navigate('/RevokeToken')}/>
      <h1>Authentifiziert mit {localStorage.getItem('clientid')}</h1>
    </div>
    
  );
};

export default Home;
