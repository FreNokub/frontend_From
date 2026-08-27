"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const LOGIN_URL = "https://6a7e6ff43183f5fd884a1562.mockapi.io/api/product";

// 🌧️ Component เอฟเฟกต์ฝนตก (ธีมสายฝนสีฟ้า-ไซเบอร์)
const RainEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const rainDrops = [];
    const maxRainDrops = 100;

    for (let i = 0; i < maxRainDrops; i++) {
      rainDrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 22 + 10,
        speed: Math.random() * 5 + 3,
        opacity: Math.random() * 0.5 + 0.15,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineCap = "round";

      rainDrops.forEach((drop) => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        // สีของเม็ดฝน (โทนฟ้า Neon Sky Blue)
        ctx.strokeStyle = `rgba(56, 189, 248, ${drop.opacity})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        drop.y += drop.speed;

        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      });
      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-70 mix-blend-screen"
    />
  );
};

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    txt_username: "",
    txt_password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.txt_username,
          password: form.txt_password,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        const tokenToSave = result.token || `mock-token-${Date.now()}`;
        localStorage.setItem("token", tokenToSave);

        const userToSave = result.user || { username: form.txt_username };
        localStorage.setItem("user", JSON.stringify(userToSave));

        await Swal.fire({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ",
          timer: 1200,
          showConfirmButton: false,
          customClass: {
            popup: "rounded-2xl bg-slate-900 text-slate-100 border border-blue-500/30",
            title: "text-slate-100 font-bold",
          },
        });

        router.push("/users");
        return;
      }

      // 401 = ยืนยันตัวตนไม่ผ่าน
      if (response.status === 401) {
        await Swal.fire({
          icon: "error",
          title: "เข้าสู่ระบบไม่สำเร็จ",
          text: result.message || "Username หรือรหัสผ่านไม่ถูกต้อง",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#2563eb",
          customClass: {
            popup: "rounded-2xl bg-slate-900 text-slate-100 border border-red-500/30",
          },
        });
      } else if (response.status === 400) {
        await Swal.fire({
          icon: "warning",
          title: `ข้อมูลไม่ถูกต้อง (status: ${response.status})`,
          text: result.message || "กรุณาตรวจสอบข้อมูลที่กรอก",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#eab308",
          customClass: {
            popup: "rounded-2xl bg-slate-900 text-slate-100 border border-yellow-500/30",
          },
        });
      } else if (response.status >= 500) {
        await Swal.fire({
          icon: "error",
          title: `เกิดข้อผิดพลาดที่เซิร์ฟเวอร์ (status: ${response.status})`,
          text: result.message || "กรุณาลองใหม่ภายหลัง",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#ef4444",
          customClass: {
            popup: "rounded-2xl bg-slate-900 text-slate-100 border border-red-500/30",
          },
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: `เข้าสู่ระบบไม่สำเร็จ (status: ${response.status})`,
          text: result.message || "เกิดข้อผิดพลาด",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#2563eb",
          customClass: {
            popup: "rounded-2xl bg-slate-900 text-slate-100 border border-blue-500/30",
          },
        });
      }
    } catch (error) {
      await Swal.fire({
        icon: "warning",
        title: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
        text: "กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต แล้วลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#2563eb",
        customClass: {
          popup: "rounded-2xl bg-slate-900 text-slate-100 border border-blue-500/30",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 sm:p-6 relative overflow-hidden font-sans">
      {/* 🌧️ สายฝนตกเบื้องหลัง */}
      <RainEffect />

      {/* 🔵 แสง Glow บรรยากาศพื้นหลัง */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* 📦 กล่อง Card ล็อกอิน */}
      <div className="relative z-10 w-full max-w-md bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-blue-500/20 shadow-2xl shadow-blue-950/50 p-6 sm:p-8 space-y-6">
        
        {/* Header & Logo Icon */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30 border border-blue-400/30">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-100 to-blue-300 bg-clip-text text-transparent">
            เข้าสู่ระบบ
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            กรุณากรอก Username และรหัสผ่านเพื่อเข้าใช้งาน
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Input: Username */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                name="txt_username"
                value={form.txt_username}
                onChange={handleChange}
                autoComplete="username"
                required
                placeholder="กรอกชื่อผู้ใช้งาน..."
                className="w-full bg-slate-800/60 border border-slate-700/80 text-slate-100 placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          {/* Input: Password */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                name="txt_password"
                value={form.txt_password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className="w-full bg-slate-800/60 border border-slate-700/80 text-slate-100 placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-5 mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm rounded-xl shadow-lg shadow-blue-600/25 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>กำลังเข้าสู่ระบบ...</span>
              </>
            ) : (
              <span>เข้าสู่ระบบ</span>
            )}
          </button>

          {/* Register Link */}
          <div className="pt-2 text-center text-xs text-slate-400">
            ยังไม่มีบัญชีใช่หรือไม่?{" "}
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors hover:underline"
            >
              สมัครสมาชิก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}