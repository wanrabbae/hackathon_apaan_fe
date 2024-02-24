"use client";

import { useEffect, useState, useRef, LegacyRef } from "react";
import { useCamera } from "@/hooks/useCamera";

export default function CameraPage() {
  return (
    <div className="container pt-16 dark:bg-zinc-950 bg-zinc-50">
      <h1>Camera</h1>
      <Camera />
    </div>
  );
}

function Camera() {
  const { videoRef, cameraStream } = useCamera();

  return (
    <div>
      <video
        ref={videoRef}
        className="w-56 aspect-square"
        preload="none"
        autoPlay
        muted
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
