import React from "react";
import { useEffect, useState } from "react";
import VideoLoader from "../components/video/VideoLoader";
import Keycloak from "keycloak-js";


const Home = () => {
    const [videoPaths, setVideoPaths] = useState<string[]>([]);
    
    const kc = new Keycloak ({
        url: 'http://localhost:8080',
        realm: 'master',
        clientId: 'real-client',
    });

    kc.init({
        onLoad: 'login-required',
        checkLoginIframe: true,
        pkceMethod: 'S256'
    })

    function logout() {
        kc.logout()
    }

    useEffect(() => {
        const videoFiles: string[] = ['VideoA.mp4']; //VideoFile names

        const repeatedVideoFiles = videoFiles.flatMap(file => Array.from({ length: 1 }, () => file));

        for (let i = repeatedVideoFiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [repeatedVideoFiles[i], repeatedVideoFiles[j]] = [repeatedVideoFiles[j], repeatedVideoFiles[i]];
        }

        setVideoPaths(repeatedVideoFiles.map(file => `/videos/${file}`));
    }, []);

    return (
        <div className="flex-grow overflow-y-auto">
            <div className={`max-w-[900px] gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-4 px-8 mt-12 mx-auto }`}>
                {videoPaths.map((videoPath, index) => (
                    <div key={index} className="relative rounded-md overflow-hidden bg-white shadow-md">
                        <VideoLoader srcPath={videoPath} />
                        <div className="px-4 py-2 text-white absolute bottom-0 left-0 right-0 flex justify-between items-center">
                            <h1 className="text-sm font-medium truncate">Videotitel</h1>
                            <button className="button-login" onClick={() => {kc.logout({redirectUri: 'http://localhost:5173/'})}}>Logout</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
 
export default Home;