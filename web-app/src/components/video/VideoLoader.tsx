import React from 'react';
import { useRef, useState } from 'react';
import { MediaPlayer, MediaProvider, Poster, isHLSProvider, 
        type MediaPlayerInstance, type MediaProviderAdapter} from '@vidstack/react';
import { DefaultAudioLayout, defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import './player.css';




const VideoLoader = ({ srcPath }: {srcPath: string}) => {
    const player = useRef<MediaPlayerInstance>(null);
    const [src,] = useState<string>(srcPath);


    function onProviderChangeHandler (provider: MediaProviderAdapter | null) {
        if (isHLSProvider(provider)) {
            provider.config = {}
        }
    }


    return (
        <div>
            <MediaPlayer
                className="player"
                title="Video Player"
                src={src}
                crossOrigin
                playsInline
                onProviderChange={onProviderChangeHandler}
                ref={player}
            >
                <MediaProvider>
                    <Poster
                        className="vds-poster"
                        src="https://example.com/poster.webp"
                        alt="Video poster"
                    />
                    {}
                </MediaProvider>
                {}
                <DefaultAudioLayout icons={defaultLayoutIcons} />
                <DefaultVideoLayout icons={defaultLayoutIcons} thumbnails="https://example.com/thumbnails.vtt" />
            </MediaPlayer>
        </div>
    );
}

export default VideoLoader;