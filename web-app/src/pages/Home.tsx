import React, { useEffect, useState } from "react";
import VideoLoader from "../components/video/VideoLoader";
import './home.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface VideoData {
  video: string;
  title: string;
  perm: string;
  owner: string;
}

interface JwtPayload {
  preferred_username: string;
}

const Home = () => {
  const [token, setToken] = useState<string | null>(null);
  const [videoPaths, setVideoPaths] = useState<{ path: string, title: string, perm: string, owner: string }[]>([]);
  const [author, setAuthor] = useState(false);
  const [allVideos, setAllVideos] = useState<VideoData[]>([]);
  const [isAdmin, setIsAdmin] = useState(false); // State für Admin-Zugriff
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Ausgewählte Kategorie
  const [username, setUsername] = useState<string | null>(null); // State für den Nutzernamen

  const navigate = useNavigate();
  const adminAccess = 'Videos2';

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    setToken(storedToken);

    if (storedToken) {
      getVideos();
      checkAdminAccess(storedToken, adminAccess); // Überprüfe Admin-Zugriff

      //Get username from token
      const decodedToken = jwtDecode<JwtPayload>(storedToken);
      const activeUser = decodedToken.preferred_username;
      setUsername(activeUser);
      localStorage.setItem('username', activeUser);
      console.log('Decoded Token:', decodedToken);
    
    }
  }, []);

  useEffect(() => {
    if (allVideos.length > 0) {
      allVideos.forEach((videoData) => {
        checkAccess(token, videoData.perm, videoData.video, videoData.title, videoData.owner);
      });
    }
  }, [allVideos, token]);

  const loadVideos = (videoPath: string, title: string, perm: string, owner: string) => {
    setVideoPaths((prevPaths) => [...prevPaths, { path: `http://localhost:5000/videos/${videoPath}`, title, perm, owner }]);
  };

  const getVideos = async () => {
    try {
      const result = await axios.get('http://localhost:5000/get-videos');
      setAllVideos(result.data.data);
    } catch (error) {
      console.error('Fehler beim Abrufen der Videos:', error);
    }
  };

  // Admin-Zugriff überprüfen
  async function checkAdminAccess(token: string | null, adminPerm: string) {
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
          'permission': adminPerm
        })
      });

      if (response.ok) {
        setAuthor(true);
        const data = await response.json();
        setIsAdmin(true);
        return true;
      } else {
        console.log('Admin-Zugriff verweigert');
        setIsAdmin(false);
        return false;
      }
    } catch (error) {
      console.error('Fehler beim Überprüfen des Admin-Zugriffs:', error);
    }
  }

  const checkAccess = async (token: string | null, perm: string, videoPath: string, title: string, owner: string) => {
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
        loadVideos(videoPath, title, perm, owner);
      } else {
        console.log('Zugriff verweigert');
      }
    } catch (error) {
      console.error('Fehler beim Überprüfen des Zugriffs:', error);
    }
  };
  console.log(videoPaths)

  // Filtere die Videos basierend auf der ausgewählten Kategorie (perm)
  const filteredVideos = selectedCategory
    ? videoPaths.filter((video) => video.perm === selectedCategory)
    : videoPaths;

  return (
    <div className="container-main">
      <div className="container-videos">
        <div className="Categ">
          <div className="radio-select">
            <input
              type="radio"
              id="premium"
              name="radio"
              onChange={() => setSelectedCategory("premium")}
            />
            <div className="radio-title">
              <label htmlFor="premium">PREMIUM</label>
            </div>
          </div>

          <div className="radio-select">
            <input
              type="radio"
              id="free"
              name="radio"
              onChange={() => setSelectedCategory("free")}
            />
            <div className="radio-title">
              <label htmlFor="free">FREE</label>
            </div>
          </div>

          <div className="radio-select">
            <input
              type="radio"
              id="private"
              name="radio"
              onChange={() => setSelectedCategory("videos")}
            />
            <div className="radio-title">
              <label htmlFor="private">MY VIDEOS</label>
            </div>
          </div>
        </div>

        <div className="videos">
          {filteredVideos.map((video, index) => (
            <div key={index} className="video">
              <VideoLoader srcPath={video.path} />
              <h3 className="title">{video.title}</h3>
              <h4>By: {video.owner}</h4>
            </div>
          ))}
        </div>
      </div>

      <div className="container-options">
        {isAdmin && ( // Bedingt rendern, wenn Admin-Zugriff gewährt wurde
          <button className="button-group" onClick={() => navigate('/Upload')}>
            Hochladen
          </button>
        )}
      </div>
      <h1>Authentifiziert mit {localStorage.getItem('clientid')}</h1>
    </div>
  );
};

export default Home;
