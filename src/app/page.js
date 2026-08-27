"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [raindrops, setRaindrops] = useState([]);
  const [screenDrops, setScreenDrops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. สร้างสายฝนตกลงมาจากด้านบน (40 สาย)
    const generatedRain = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      height: `${Math.random() * 25 + 15}px`,
      opacity: Math.random() * 0.5 + 0.2,
      animationDuration: `${Math.random() * 0.6 + 0.6}s`,
      animationDelay: `${Math.random() * 2}s`,
    }));
    setRaindrops(generatedRain);

    // 2. สร้างหยดน้ำเกาะ/เกาะแล้วไหลช้าๆ บนหน้าจอ (25 หยด)
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

    // 📌 จำลองการโหลดข้อมูล 1.5 วินาที
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const featuredBooks = [
    { title: "The Art of Thinking", author: "นักเขียน A", price: "฿250", color: "from-cyan-900/30 to-blue-900/30", tag: "ขายดี", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop" },
    { title: "จักรวาลในกำมือ", author: "นักเขียน B", price: "฿320", color: "from-indigo-900/30 to-blue-900/30", tag: "มาใหม่", image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=400&auto=format&fit=crop" },
    { title: "พักผ่อนให้เป็น", author: "นักเขียน C", price: "฿199", color: "from-emerald-900/30 to-cyan-900/30", tag: "", image: "https://images.unsplash.com/photo-1506784926709-22f1ec395907?q=80&w=400&auto=format&fit=crop" },
    { title: "จิตวิทยาการลงทุน", author: "นักเขียน D", price: "฿290", color: "from-amber-900/30 to-orange-900/30", tag: "แนะนำ", image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=400&auto=format&fit=crop" },
  ];

  const categories = [
    { name: "วรรณกรรมแปล", icon: "🌍", glow: "hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:border-purple-500/50" },
    { name: "พัฒนาตนเอง", icon: "🌱", glow: "hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:border-emerald-500/50" },
    { name: "ธุรกิจและการลงทุน", icon: "📈", glow: "hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:border-cyan-500/50" },
    { name: "นิยายสืบสวน", icon: "🕵️‍♂️", glow: "hover:shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:border-rose-500/50" },
  ];

  // 📌 หน้าจอ Loading Screen (กระจกฝ้าดำโปร่งแสง)
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
            Kuru Kuru~ กำลังเตรียมหน้าแรก...
          </p>
        </div>
      </div>
    );
  }

  return (
    // เปลี่ยน bg-zinc-950 เป็น bg-transparent เพื่อให้เห็นวิดีโอพื้นหลัง
    <main className="relative flex min-h-screen flex-col bg-transparent text-white overflow-hidden font-sans animate-[fadeIn_0.5s_ease-in-out]">
      
      {/* Keyframes สำหรับสายฝน และหยดน้ำไหลบนกระจกหน้าจอ */}
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
      `}</style>

      {/* 1. Rainfall Layer (สายฝนตก) */}
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

      {/* 2. Glass Wet Droplets Layer (หยดน้ำนูนเปียกหน้าจอสมจริง) */}
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

      {/* 1. Hero Section (แบนเนอร์หลัก) */}
      <section className="relative overflow-hidden pt-20 pb-32 lg:pt-28 z-10">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-cyan-900/20 blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/2 right-0 h-96 w-96 -translate-y-1/2 translate-x-1/3 rounded-full bg-blue-900/20 blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-7xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            ค้นพบโลกใบใหม่ <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]">
              ผ่านตัวอักษร
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] leading-relaxed font-medium">
            แหล่งรวบรวมหนังสือคุณภาพที่คัดสรรมาเพื่อคุณโดยเฉพาะ ไม่ว่าจะเป็นนิยาย 
            วรรณกรรม หรือหนังสือพัฒนาตัวเอง เริ่มต้นการเดินทางไปกับเราได้เลย
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/service" 
              className="w-full sm:w-auto rounded-full bg-cyan-600/90 backdrop-blur-md px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.7)] hover:bg-cyan-500 transition-all duration-300 active:scale-95 border border-cyan-400/40"
            >
              เลือกชมหนังสือทั้งหมด
            </Link>
            <Link 
              href="/about" 
              className="w-full sm:w-auto rounded-full bg-black/40 backdrop-blur-md px-8 py-3.5 text-sm font-semibold text-zinc-200 border border-white/20 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-black/60 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300 active:scale-95"
            >
              เกี่ยวกับเรา
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Categories Section (หมวดหมู่หนังสือ - โปร่งแสงสไตล์กระจกฝ้า) */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-12 w-full">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 p-6 transition-all duration-300 hover:bg-black/60 hover:-translate-y-1 shadow-lg ${cat.glow}`}
            >
              <span className="text-3xl mb-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">{cat.icon}</span>
              <span className="text-sm font-bold text-zinc-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Books Section (หนังสือแนะนำ - โปร่งแสงกระจกฝ้า) */}
      <section className="relative z-10 bg-black/30 backdrop-blur-xl py-24 mt-12 border-t border-cyan-500/20 rounded-t-[3rem] shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.5)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">หนังสือแนะนำ</h2>
              <p className="mt-2 text-zinc-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">หนังสือที่กำลังมาแรงและน่าสนใจในสัปดาห์นี้</p>
            </div>
            <Link href="/service" className="hidden sm:block text-sm font-semibold text-cyan-400 hover:text-cyan-300 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all">
              ดูทั้งหมด &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredBooks.map((book, idx) => (
              <div 
                key={idx} 
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.37)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:border-cyan-400/60 hover:bg-black/60 hover:-translate-y-1.5"
              >
                <div className={`relative h-72 w-full flex items-center justify-center bg-gradient-to-br ${book.color}`}>
                  
                  <div className="h-48 w-32 rounded bg-black/60 border border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2 group-hover:border-cyan-400">
                    {book.image ? (
                      <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <span className="text-xs font-bold text-zinc-400">หน้าปก</span>
                        <span className="text-[10px] text-zinc-300 mt-1 text-center px-2">{book.title}</span>
                      </>
                    )}
                  </div>
                  
                  {book.tag && (
                    <span className="absolute top-4 left-4 rounded-full bg-black/70 border border-cyan-500/50 backdrop-blur-md px-3 py-1 text-xs font-bold text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                      {book.tag}
                    </span>
                  )}
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-white text-lg line-clamp-1 group-hover:text-cyan-400 transition-colors drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">{book.title}</h3>
                  <p className="mt-1 text-sm text-zinc-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">{book.author}</p>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="text-xl font-black text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">{book.price}</span>
                    <button className="rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2 text-xs font-bold text-zinc-200 transition-all duration-200 hover:bg-cyan-600 hover:border-cyan-500 hover:text-white hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] active:scale-95">
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center sm:hidden">
             <Link href="/service" className="inline-block rounded-full bg-black/50 border border-cyan-500/40 backdrop-blur-md px-6 py-3 text-sm font-semibold text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              ดูหนังสือทั้งหมด
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}