"use client";

import { useEffect, useRef, useState } from "react";

export function useCamera(options = { video: true, audio: false }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [captureVideo, setCaptureVideo] = useState(false);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia(options).then((stream) => {
      if (!videoRef.current) {
        return;
      }
      videoRef.current.srcObject = stream;
      setCaptureVideo(true);
    });
  }, []);

  return { videoRef, captureVideo };
}
