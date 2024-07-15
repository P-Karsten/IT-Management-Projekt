// Home.tsx
import React, { useEffect, useState } from "react";
import VideoLoader from "../components/video/VideoLoader";
import './home.css';
import keycloak from './keycloak';
import { useNavigate } from 'react-router-dom';
import RevokeToken from './Test';
import axios from 'axios';

const Home = () => {
  const [token, setToken] = useState<string | null>(null);
  const [videoPaths, setVideoPaths] = useState<string[]>([]);
  const [author, setAuthor] = useState(false);
  const [allVideos, setAllVideos] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    setToken(storedToken);

    const checkAccess = async (token: string | null) => {
      const clientid = localStorage.getItem('clientid')!;
      if (!token) return;

      const resourceAdmin = 'Videos2';

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
          await getVideos(); // Ensure videos are fetched before loading them
        } else {
          console.log('Admin access denied');
        }
      } catch (error) {
        console.error('Error checking admin access:', error);
      }
    };

    checkAccess(storedToken);
  }, []);

  useEffect(() => {
    if (allVideos.length > 0) {
      loadVideos();
    }
  }, [allVideos]);

  const loadVideos = () => {
    const paths = allVideos.map((data) => `http://localhost:5000/videos/${data.video}`);
    setVideoPaths(paths);
  };

  const getVideos = async () => {
    try {
      const result = await axios.get('http://localhost:5000/get-videos');
      console.log('getVideos:', result.data.data);
      setAllVideos(result.data.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  return (
    <div className="container-main">
      <div className="container-popular flexCol">
        <div className="Hline">Videos</div>
        <div className="videos flexRow">
          {videoPaths.map((videoPath, index) => (
            <div key={index} className="video">
              <VideoLoader srcPath={videoPath} />
              <h3>{videoPath}</h3>
            </div>
          ))}
        </div>
      </div>

      <RevokeToken onClick={() => navigate('/RevokeToken')} />
      <h1>Authentifiziert mit {localStorage.getItem('clientid')}</h1>
    </div>
  );
};

export default Home;
