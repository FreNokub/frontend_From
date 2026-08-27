"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Contact() {
  // เพิ่ม State สำหรับจัดการหน้าจอโหลด
  const [isLoading, setIsLoading] = useState(true);
  const [raindrops, setRaindrops] = useState([]);

  // สุ่มตำแหน่ง คุณสมบัติของหยดน้ำฝนฝั่ง Client
  useEffect(() => {
    // กำหนดเวลาหน้าแสดง Loading Screen (2 วินาที)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const generatedRain = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      height: `${Math.random() * 25 + 15}px`, // ความยาวสายฝน 15px - 40px
      opacity: Math.random() * 0.5 + 0.2,
      animationDuration: `${Math.random() * 0.6 + 0.6}s`, // ฝนตกเร็วสายพริ้ว 0.6-1.2 วินาที
      animationDelay: `${Math.random() * 2}s`,
    }));
    setRaindrops(generatedRain);

    // เคลียร์ timer เพื่อป้องกัน memory leak
    return () => clearTimeout(timer);
  }, []);

  // หน้าจอ Loading Screen (Herta GIF)
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950/90 backdrop-blur-xl">
        <div className="relative flex flex-col items-center">
          <img
            src="/hsr-honkai.gif"
            alt="Loading Herta"
            className="w-48 h-48 object-contain" // ไม่มีเงา
          />
          <p className="mt-6 font-bold text-lg text-cyan-400 tracking-wider animate-pulse drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
            Kuru Kuru~ กำลังโหลด...
          </p>
        </div>
      </div>
    );
  }

  return (
    // เปลี่ยน bg-zinc-950 เป็น bg-transparent เพื่อให้เห็นพื้นหลังที่ซ้อนอยู่ด้านหลัง
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 bg-transparent text-white overflow-hidden font-sans">
      
      {/* Keyframes แอนิเมชันฝนตกและปุ่ม Shimmer */}
      <style>{`
        @keyframes rainfall {
          0% {
            transform: translate3d(0, -50px, 0);
          }
          100% {
            transform: translate3d(-15px, 105vh, 0);
          }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%) skewX(12deg); }
        }
      `}</style>

      {/* Rainfall Container (ประมวลผลระดับ GPU ไม่กระตุก) */}
      <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
        {raindrops.map((rain) => (
          <div
            key={rain.id}
            className="absolute w-[1.5px] bg-gradient-to-b from-transparent via-cyan-400 to-blue-300 shadow-[0_0_6px_rgba(34,211,238,0.8)]"
            style={{
              left: rain.left,
              height: rain.height,
              opacity: rain.opacity,
              animation: `rainfall ${rain.animationDuration} linear infinite`,
              animationDelay: rain.animationDelay,
              willChange: "transform",
            }}
          />
        ))}
      </div>

      {/* เอฟเฟกต์แสงเรืองแสงพื้นหลัง (Ambient Glow) */}
      <div className="absolute w-[400px] h-[400px] bg-cyan-900/20 rounded-full blur-[140px] pointer-events-none" />

      {/* กล่องการ์ดครอบเนื้อหาหลัก (กระจกฝ้าโปร่งแสง) */}
      <div className="relative z-10 max-w-xl w-full rounded-3xl border border-white/15 bg-black/40 backdrop-blur-md p-10 shadow-[0_8px_32px_rgba(0,0,0,0.37)] overflow-hidden">
        
        {/* ดีเทลลูกเล่นแสงสะท้อนทรงกลมจางๆ ด้านใน */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* หัวข้อ Contact Page พร้อมไล่สีเรืองแสง */}
        <h1 className="text-4xl font-black text-white tracking-tight sm:text-5xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          Contact{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
            Page
          </span>
        </h1>
        
        {/* ข้อความรายละเอียด */}
        <p className="mt-5 text-lg leading-relaxed text-zinc-300 max-w-md mx-auto font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          ชื่อ <span className="text-cyan-400 font-semibold drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">Pannatad Mankeaw ประมาณนี้เพราะผมหมดไฟเฉย</span>
        </p>

        {/* ปุ่ม Action ด้านล่างสำหรับกลับหน้าหลัก */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <Link 
            href="/" 
            className="relative inline-flex items-center justify-center rounded-full bg-cyan-600/90 backdrop-blur-md px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.7)] hover:bg-cyan-500 transition-all duration-300 active:scale-95 border border-cyan-400/40 group overflow-hidden"
          >
            {/* เอฟเฟกต์แสงสะท้อนในปุ่ม */}
            <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-12" />
            
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              กลับสู่หน้าหลัก
            </span>
          </Link>
        </div>

      </div>

    </div>
  );
}