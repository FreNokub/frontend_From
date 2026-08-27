// src/components/BackgroundVideo.jsx

"use client";

import { useState, useRef } from "react";

export default function BackgroundVideo() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        loop={true} // << ลองเปลี่ยนเป็น loop={true} ตรงนี้ครับ
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10 opacity-40"
      >
        <source src="/honkaiporipori.mp4" type="video/mp4" />
      </video>

      {/* ปุ่มเปิด-ปิดเสียง */}
      <button
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center gap-2 bg-white/20 hover:bg-white/40 text-white px-4 py-2 rounded-full backdrop-blur-md transition-all duration-300"
      >
        {isMuted ? (
          <span>🔇 เปิดเสียงเพลง</span>
        ) : (
          <span>🔊 ปิดเสียงเพลง</span>
        )}
      </button>
    </>
  );
}