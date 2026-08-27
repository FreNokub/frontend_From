"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Service() {
  const [raindrops, setRaindrops] = useState([]);
  const [screenDrops, setScreenDrops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

    // จำลองการโหลดข้อมูล 1.5 วินาที เพื่อโชว์น้อง Herta
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      title: "พัฒนาเว็บไซต์",
      description: "สร้างเว็บไซต์ที่รวดเร็ว รองรับทุกอุปกรณ์ และทันสมัย ตอบโจทย์ทุกความต้องการของธุรกิจคุณ",
      icon: "💻",
    },
    {
      title: "ออกแบบ UI/UX",
      description: "ดีไซน์หน้าต่างการใช้งานที่สวยงาม ใช้งานง่าย และเน้นประสบการณ์ที่ดีที่สุดของผู้ใช้",
      icon: "🎨",
    },
    {
      title: "ปรับแต่ง SEO",
      description: "เพิ่มอันดับการค้นหาบน Google เพื่อดึงดูดผู้เข้าชมเว็บไซต์แบบธรรมชาติและยั่งยืน",
      icon: "📈",
    },
    {
      title: "ระบบคลาวด์โซลูชัน",
      description: "ติดตั้งและปรับขยายระบบแอปพลิเคชันอย่างปลอดภัยด้วยโครงสร้างพื้นฐานคลาวด์ที่ทันสมัย",
      icon: "☁️",
    },
  ];

  // 📌 หน้าจอ Loading Screen แบบเต็มหน้า
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950/90 backdrop-blur-xl overflow-hidden">
        <div className="relative flex flex-col items-center">
          <img
            src="/hsr-honkai.gif"
            alt="Loading Herta"
            className="w-48 h-48 object-contain"
          />
          <p className="mt-6 font-bold text-lg text-cyan-400 tracking-wider animate-pulse drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] text-center">
            Kuru Kuru~ กำลังเตรียมหน้าบริการ...
          </p>
        </div>
      </div>
    );
  }

  return (
    // เปลี่ยน bg-zinc-950 เป็น bg-transparent เพื่อให้เห็นพื้นหลังที่ซ้อนอยู่ด้านหลัง
    <div className="relative min-h-screen bg-transparent text-white overflow-hidden font-sans">
      
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-900/20 blur-[130px] pointer-events-none" />

      {/* เนื้อหาหลักของหน้า */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 text-center animate-[fadeIn_0.5s_ease-in-out]">
        
        {/* หัวข้อหน้าแสดงบริการ */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          บริการของเรา{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]">
            Services
          </span>
        </h1>
        
        {/* เส้นคั่นเรืองแสง */}
        <div className="mx-auto my-6 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
        
        {/* คำโปรยแนะนำบริการ */}
        <p className="mx-auto max-w-2xl text-lg text-zinc-300 leading-relaxed font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          เรามอบดิจิทัลโซลูชันคุณภาพสูงเพื่อช่วยให้ธุรกิจของคุณเติบโตในยุคดิจิทัล ค้นพบสิ่งที่เราสามารถช่วยคุณได้ที่นี่
        </p>

        {/* การ์ดแสดงบริการแยกเป็น 4 กล่อง (โปร่งแสงเห็นพื้นหลังกระจกฝ้า) */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 text-left">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative rounded-2xl border border-white/15 bg-black/40 backdrop-blur-md p-6 shadow-[0_8px_32px_rgba(0,0,0,0.37)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:border-cyan-400 hover:bg-black/60 hover:-translate-y-1.5 overflow-hidden"
            >
              {/* แสงพาดผ่านเบาๆ ตอน Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon ประจำบริการ */}
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-black/60 border border-cyan-500/30 text-2xl shadow-[0_0_10px_rgba(34,211,238,0.2)] transition-transform duration-300 group-hover:scale-110 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                {service.icon}
              </div>
              
              <h3 className="relative z-10 mt-5 text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {service.title}
              </h3>
              
              <p className="relative z-10 mt-2 text-sm text-zinc-300 leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* ปุ่มด้านล่างสำหรับนำทาง */}
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          <Link 
            href="/contact" 
            className="relative rounded-full bg-cyan-600/90 backdrop-blur-md px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(34,211,238,0.7)] hover:bg-cyan-500 hover:-translate-y-0.5 active:scale-95 border border-cyan-400/40 group overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-12" />
            <span className="relative z-10">ขอใบเสนอราคา</span>
          </Link>
          <Link 
            href="/" 
            className="rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-6 py-3.5 text-sm font-semibold text-zinc-200 transition-all duration-300 hover:bg-black/60 hover:text-white hover:border-white/40 shadow-lg"
          >
            กลับสู่หน้าแรก
          </Link>
        </div>

      </div>
    </div>
  );
}