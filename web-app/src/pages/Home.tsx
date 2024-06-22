// Home.tsx
import React, { useEffect, useState } from "react";
import VideoLoader from "../components/video/VideoLoader";
import './home.css';
import keycloak from './keycloak';
import { useNavigate } from 'react-router-dom';
import RevokeToken from './Test';


const Home = () => {
  const [token, setToken] = useState<string | null>(null);
  const [videoPaths, setVideoPaths] = useState<string[]>([]);
  const [author, setAuthor] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    setToken(storedToken);

    const checkAccess = async (token: string | null) => {
      if (!token) return;

      const resource = 'Videos1'; // Specify the resource you want to check

      try {
        const response = await fetch('http://localhost:8080/realms/master/protocol/openid-connect/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
          },
          body: new URLSearchParams({
            'grant_type': 'urn:ietf:params:oauth:grant-type:uma-ticket',
            'audience': 'real-client',
            'permission': resource
          })
        });

        if (response.ok) {
          setAuthor(true);
          const data = await response.json();
          console.log('Access granted:', data);
          loadVideos();
        } else {
          console.log('Access denied');
          
        }
      } catch (error) {
        console.error('Error checking access:', error);
      }
    };

    const loadVideos = () => {
      const videoFiles: string[] = ['VideoA.mp4', 'VideoB.mp4', 'VideoC.mp4']; // VideoFile names

      const repeatedVideoFiles = videoFiles.flatMap(file => Array.from({ length: 1 }, () => file));

      for (let i = repeatedVideoFiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [repeatedVideoFiles[i], repeatedVideoFiles[j]] = [repeatedVideoFiles[j], repeatedVideoFiles[i]];
      }

      setVideoPaths(repeatedVideoFiles.map(file => `/videos/${file}`));
    };

    checkAccess(storedToken);
  }, []);

  return (
    <div className="container-main">
      <div className="container-popular flexCol">
        <div className="Hline">POPULAR</div>
        <div className="videos flexRow">
          {videoPaths.map((videoPath, index) => (
            <div key={index} className="video">
              <VideoLoader srcPath={videoPath} />
              <h3>{videoPath}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="container-new flexCol">
        <div className="Hline">BEST OF TODAY</div>
        <div className="videos flexRow">
          {videoPaths.map((videoPath, index) => (
            <div key={index} className="video">
              <VideoLoader srcPath={videoPath} />
              <h3>{videoPath}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="container-user flexCol">
        <div className="Hline">NEW</div>
        <div className="videos flexRow">
          {videoPaths.map((videoPath, index) => (
            <div key={index} className="video">
              <VideoLoader srcPath={videoPath} />
              <h3>{videoPath}</h3>
            </div>
          ))}
          
        </div>
        
      </div>
      <RevokeToken onClick= {() => navigate('/RevokeToken')}/>
    </div>
  );
};

export default Home;
