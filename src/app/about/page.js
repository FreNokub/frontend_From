"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [raindrops, setRaindrops] = useState([]);
  const [screenDrops, setScreenDrops] = useState([]);

  useEffect(() => {
    // กำหนดเวลาหน้าแสดง Loading Screen (2 วินาที)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // 1. สร้างสายฝนตกลงมาจากด้านบน (45 สาย)
    const generatedRain = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      height: `${Math.random() * 25 + 15}px`,
      opacity: Math.random() * 0.5 + 0.2,
      animationDuration: `${Math.random() * 0.6 + 0.5}s`,
      animationDelay: `${Math.random() * 2}s`,
    }));
    setRaindrops(generatedRain);

    // 2. สร้างหยดน้ำเกาะและค่อยๆ ไหลลงบนกระจกหน้าจอ (25 หยด)
    const generatedDrops = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 96 + 2}%`,
      top: `${Math.random() * 90 + 5}%`,
      size: `${Math.random() * 6 + 4}px`,
      opacity: Math.random() * 0.4 + 0.4,
      animationDuration: `${Math.random() * 4 + 4}s`,
      animationDelay: `${Math.random() * 3}s`,
    }));
    setScreenDrops(generatedDrops);

    return () => clearTimeout(timer);
  }, []);

  // หน้าจอ Loading Screen (Herta GIF - กระจกฝ้าดำโปร่งแสง)
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950/90 backdrop-blur-xl overflow-hidden">
        <div className="relative flex flex-col items-center">
          <img
            src="/hsr-honkai.gif"
            alt="Loading Herta"
            className="w-48 h-48 object-contain"
          />
          <p className="mt-6 font-bold text-lg text-cyan-400 tracking-wider animate-pulse drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
            Kuru Kuru~ กำลังโหลด...
          </p>
        </div>
      </div>
    );
  }

  return (
    // เปลี่ยน bg-zinc-950 เป็น bg-transparent เพื่อทะลุเห็นพื้นหลัง
    <main className="relative flex min-h-screen flex-col bg-transparent text-white overflow-hidden font-sans animate-[fadeIn_0.5s_ease-in-out]">
      
      {/* Keyframes สำหรับฝนตก และลายน้ำไหลบนกระจกหน้าจอ */}
      <style>{`
        @keyframes rainfall {
          0% {
            transform: translate3d(0, -50px, 0);
          }
          100% {
            transform: translate3d(-15px, 105vh, 0);
          }
        }
        @keyframes dropTrickle {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate3d(-2px, 15px, 0) scale(1.1);
            opacity: 0.7;
          }
          100% {
            transform: translate3d(-5px, 35px, 0) scale(0.8);
            opacity: 0;
          }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%) skewX(12deg); }
        }
      `}</style>

      {/* 1. Rainfall Layer (สายฝนตกผ่าน GPU) */}
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

      {/* 2. Screen Glass Droplets Layer (หยดน้ำนูนเปียกหน้าจอ) */}
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden backdrop-blur-[0.3px]">
        {screenDrops.map((drop) => (
          <div
            key={drop.id}
            className="absolute rounded-full border border-white/40 bg-gradient-to-br from-white/60 via-transparent to-cyan-500/30 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),0_2px_4px_rgba(0,0,0,0.5)]"
            style={{
              left: drop.left,
              top: drop.top,
              width: drop.size,
              height: drop.size,
              opacity: drop.opacity,
              animation: `dropTrickle ${drop.animationDuration} ease-in-out infinite`,
              animationDelay: drop.animationDelay,
              willChange: "transform, opacity",
            }}
          />
        ))}
      </div>

      {/* เอฟเฟกต์แสงเรืองแสงพื้นหลัง (Ambient Glow) */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none" />

      {/* ส่วนหัวข้อหลัก (กระจกฝ้าโปร่งแสง) */}
      <section className="relative z-10 px-6 py-24 text-center border-b border-white/10 bg-black/40 backdrop-blur-md shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
        <h1 className="mb-6 text-4xl font-extrabold text-white sm:text-5xl md:text-6xl tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          เกี่ยวกับเรา{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]">
            Book Haven
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-zinc-300 leading-relaxed font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          พื้นที่สำหรับคนรักการอ่าน เพราะเราเชื่อว่าหนังสือทุกเล่มสามารถเปลี่ยนชีวิต 
          และพาคุณเดินทางไปได้ทั่วโลกโดยไม่ต้องก้าวขาออกจากบ้าน
        </p>
      </section>

      {/* ส่วนรายละเอียด */}
      <section className="relative z-10 mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2">
        
        {/* กล่องรูปภาพพร้อมเอฟเฟกต์ Glassmorphism และรูปภาพเต็มกรอบ */}
        <div className="group relative flex h-80 w-full items-center justify-center rounded-2xl bg-zinc-900/40 border border-white/15 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.37)] hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(34,211,238,0.3)] hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-pointer">
          {/* รูปภาพแสดงเต็มพื้นที่กรอบ */}
          <img 
            src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=800&auto=format&fit=crop" 
            alt="บรรยากาศร้าน Book Haven"
            className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
          />

          {/* Overlay เงาดำ- cyan ช่วยคุมโทนความเข้มและทำให้ข้อความอ่านง่าย */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-500" />
          
          {/* เอฟเฟกต์แสง Hover มุมซ้ายบน */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* ข้อความกำกับด้านล่างรูปภาพ */}
          <div className="relative z-10 flex h-full w-full flex-col justify-end p-6">
            <span className="font-bold tracking-widest uppercase text-xs text-cyan-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              Book Haven Atmosphere
            </span>
          </div>
        </div>

        {/* เนื้อหาข้อความ */}
        <div className="flex flex-col justify-center rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 p-8 shadow-lg">
          <h2 className="mb-6 text-3xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            จุดเริ่มต้นจากความ<span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">หลงใหล</span>ในตัวอักษร
          </h2>
          <p className="mb-5 text-zinc-200 leading-relaxed text-lg drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            Book Haven ก่อตั้งขึ้นด้วยความตั้งใจที่จะรวบรวมหนังสือคุณภาพดี ทั้งวรรณกรรมคลาสสิก 
            หนังสือพัฒนาตนเอง และนิยายแปลน่าอ่าน มาไว้ในที่เดียว
          </p>
          <p className="text-zinc-200 leading-relaxed text-lg border-l-2 border-cyan-400 pl-4 py-2 bg-gradient-to-r from-cyan-900/30 to-transparent rounded-r-lg drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            เราคัดเลือกหนังสือทุกเล่มด้วยความใส่ใจ เพื่อให้มั่นใจว่าทุกหน้าที่คุณเปิดอ่านจะเต็มไปด้วยคุณค่าและความเพลิดเพลิน
          </p>
        </div>
      </section>

      {/* ปุ่มกลับหน้าแรก */}
      <section className="relative z-10 px-6 pb-24 pt-6 text-center">
        <Link 
          href="/" 
          className="relative inline-flex items-center justify-center rounded-full bg-cyan-600/90 backdrop-blur-md px-8 py-3.5 font-bold text-white shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.7)] hover:bg-cyan-500 transition-all duration-300 active:scale-95 border border-cyan-400/40 group overflow-hidden"
        >
          <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-12" />
          
          <span className="relative z-10 flex items-center gap-2">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            กลับสู่หน้าแรก
          </span>
        </Link>
      </section>

    </main>
  );
}