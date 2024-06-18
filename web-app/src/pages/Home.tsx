// Home.tsx
import React from "react";
import { useEffect, useState } from "react";
import VideoLoader from "../components/video/VideoLoader";
import './home.css';
import ReactDOM from 'react-dom';
import App1 from '../App';
import keycloak from './keycloak';
import { ReactKeycloakProvider } from '@react-keycloak/web';




const Home = ({ userInfo }) => {
  const [videoPaths, setVideoPaths] = useState<string[]>([]);

  useEffect(() => {
    const videoFiles: string[] = ['VideoA.mp4', 'VideoB.mp4', 'VideoC.mp4']; // VideoFile names

    const repeatedVideoFiles = videoFiles.flatMap(file => Array.from({ length: 1 }, () => file));

    for (let i = repeatedVideoFiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [repeatedVideoFiles[i], repeatedVideoFiles[j]] = [repeatedVideoFiles[j], repeatedVideoFiles[i]];
    }

    setVideoPaths(repeatedVideoFiles.map(file => `/videos/${file}`));
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
    </div>
  );
};





export default Home;
