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

  // เมื่อเล่นจบ หน่วงเวลา 5 วินาที แล้วค่อยเริ่มเล่นใหม่
  const handleEnded = () => {
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    }, 5000); // 5,000 มิลลิวินาที = 5 วินาที
  };

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={handleEnded} // ดักจับตอนจบคลิปเพื่อเริ่มนับถอยหลัง 5 วิ
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