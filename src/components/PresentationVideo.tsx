'use client';

import YouTube, { YouTubeProps } from "react-youtube";

const opts: YouTubeProps['opts'] = {
  // width: '100%',
  // height: '500px',
  playerVars: {
    autoplay: 1,
  }
}



export default function PresentationVideo() {
  return (
    <YouTube videoId="BKbbl5TJGko"
      className="w-full h-full flex justify-center items-center"
      style={{
        maxWidth: '100%',
        maxHeight: '100%'
      }}
      opts={opts}
    />
  )
}
