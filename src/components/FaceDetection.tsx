"use client";

import * as faceapi from "face-api.js";
import { useEffect, useRef, useState } from "react";
import { useCamera } from "@/hooks/useCamera";

export function FaceDetection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const { videoRef, captureVideo } = useCamera();
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.NEXT_PUBLIC_URL + "/models";
      Promise.all([
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      ]).then(() => {
        setIsModelLoaded(true);
      });
    };

    loadModels();
  }, []);

  useEffect(() => {
    if (!captureVideo) return;
    if (!isModelLoaded) return;
    handleVideoOnPlay();
  }, [isModelLoaded, captureVideo]);

  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (canvasRef?.current && videoRef?.current && parentRef?.current) {
        const videoElement = videoRef.current;
        const canvasElement = canvasRef.current;
        const parentElement = parentRef.current;

        const detections = await faceapi
          .detectAllFaces(videoElement)
          .withFaceLandmarks()
          .withFaceExpressions();

        canvasElement.appendChild(faceapi.createCanvasFromMedia(videoElement));

        const displaySize = {
          width: parentElement.clientWidth + 24,
          height: parentElement.clientWidth + 24,
        };

        console.log(displaySize);

        faceapi.matchDimensions(canvasElement, displaySize);

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        const context = canvasElement.getContext("2d");

        if (context) {
          context.clearRect(0, 0, displaySize.width, displaySize.height);
        }

        faceapi.draw.drawDetections(canvasElement, resizedDetections);
      }
    }, 100);
  };

  return (
    <div
      ref={parentRef}
      className="w-full aspect-square rounded overflow-hidden flex justify-center"
    >
      {isModelLoaded && (
        <>
          <video
            className="aspect-square object-cover object-center"
            ref={videoRef}
            preload="none"
            autoPlay
            muted
            disablePictureInPicture
            disableRemotePlayback
          ></video>
          <canvas ref={canvasRef} className="absolute" />
        </>
      )}
    </div>
  );
}
