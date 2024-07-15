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

    if (storedToken) {
      getVideos();
    }
  }, []);

  useEffect(() => {
    if (allVideos.length > 0) {
      allVideos.forEach((videoData) => {
        checkAccess(token, videoData.perm, videoData.video);
      });
    }
  }, [allVideos, token]);

  const loadVideos = (videoPath: string) => {
    setVideoPaths((prevPaths) => [...prevPaths, `http://localhost:5000/videos/${videoPath}`]);
  };

  const getVideos = async () => {
    try {
      const result = await axios.get('http://localhost:5000/get-videos');
      setAllVideos(result.data.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const checkAccess = async (token: string | null, perm: string, videoPath: string) => {
    const clientid = localStorage.getItem('clientid')!;
    if (!token) return;

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
          'permission': perm
        })
      });

      if (response.ok) {
        setAuthor(true);
        const data = await response.json();
        console.log("check acc vid path", videoPath);
        loadVideos(videoPath);
      } else {
        console.log('Admin access denied');
      }
    } catch (error) {
      console.error('Error checking admin access:', error);
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