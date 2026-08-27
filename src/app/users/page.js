"use client";

import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const API_URL = "https://6a7e6ff43183f5fd884a1562.mockapi.io/api/product";

// 🌧️ 1. สร้าง Component เอฟเฟกต์ฝนตก (ใช้ HTML5 Canvas)
const RainEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    // ตั้งค่าขนาด Canvas ให้เต็มจอ
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const rainDrops = [];
    const maxRainDrops = 100; // จำนวนเม็ดฝน (ปรับเพิ่ม/ลดได้)

    // สร้างเม็ดฝนแบบสุ่ม
    for (let i = 0; i < maxRainDrops; i++) {
      rainDrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 20 + 10, // ความยาวของเม็ดฝน
        speed: Math.random() * 4 + 2, // ความเร็วในการตก
        opacity: Math.random() * 0.4 + 0.1, // ความโปร่งใส
      });
    }

    const draw = () => {
      // เคลียร์เฟรมเก่า
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineCap = "round";

      rainDrops.forEach((drop) => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        // สีของเม็ดฝน (ใช้สีฟ้าอมม่วงอ่อนๆ ให้เข้ากับธีม)
        ctx.strokeStyle = `rgba(165, 180, 252, ${drop.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // คำนวณตำแหน่งถัดไป
        drop.y += drop.speed;

        // ถ้าร่วงเลยขอบจอด้านล่าง ให้วนกลับไปสุ่มตกใหม่จากข้างบน
        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      });
      requestAnimationFrame(draw);
    };

    draw();

    // ปรับขนาด Canvas อัตโนมัติเวลาผู้ใช้ย่อ/ขยายหน้าจอ
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
      className="fixed inset-0 z-0 pointer-events-none opacity-60 mix-blend-screen"
    />
  );
};

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 📌 1. ตรวจสอบการล็อกอินก่อนเข้าใช้งาน
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาล็อกอินก่อนเข้าใช้งาน",
        text: "คุณต้องเข้าสู่ระบบเพื่อเข้าถึงหน้านี้",
        confirmButtonColor: "#6366f1",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        router.push("/login");
      });
    } else {
      setIsAuthenticated(true);
      fetchUsers();
    }
  }, [router]);

  // 📌 ฟังก์ชัน Logout
  const handleLogout = async () => {
    const confirm = await Swal.fire({
      icon: "question",
      title: "ยืนยันการออกจากระบบ?",
      text: "คุณต้องการออกจากระบบใช่หรือไม่",
      showCancelButton: true,
      confirmButtonText: "ออกจากระบบ",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      customClass: {
        popup: "rounded-2xl bg-slate-800 text-slate-100 border border-slate-700",
        title: "text-slate-100 font-bold",
        htmlContainer: "text-slate-300",
      },
    });

    if (confirm.isConfirmed) {
      localStorage.removeItem("token");
      await Swal.fire({
        icon: "success",
        title: "ออกจากระบบสำเร็จ",
        timer: 1200,
        showConfirmButton: false,
      });
      router.push("/login");
    }
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await fetch(API_URL);

      if (!response.ok) throw new Error(`Status ${response.status}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setIsError(true);
      await Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถดึงข้อมูลผู้ใช้งานได้",
        confirmButtonColor: "#6366f1",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 📌 ฟังก์ชันพาไปหน้า Edit
  const handleEdit = (id) => {
    if (!id || id.startsWith("fallback-")) {
      return Swal.fire({
        icon: "error",
        title: "ไม่พบ ID ผู้ใช้งาน",
        text: "ข้อมูลนี้ไม่สมบูรณ์ ไม่สามารถแก้ไขได้",
        confirmButtonColor: "#6366f1",
      });
    }
    router.push(`/users/edit/${id}`);
  };

  // 📌 ฟังก์ชันลบข้อมูล
  const handleDelete = async (user) => {
    const userId = String(user?.id || user?._id);

    if (!userId || userId === "undefined") {
      return Swal.fire({
        icon: "error",
        title: "ไม่พบ ID ผู้ใช้งาน",
        confirmButtonColor: "#6366f1",
      });
    }

    const fullName = `${user.firstname || ""} ${user.lastname || ""}`.trim() || "ผู้ใช้นี้";

    const confirm = await Swal.fire({
      icon: "warning",
      title: "ยืนยันการลบข้อมูล?",
      html: `คุณกำลังจะลบสมาชิก <b class="text-rose-400 text-lg">${fullName}</b><br/><span class="text-xs text-slate-400">ข้อมูลนี้จะถูกลบถาวรและไม่สามารถกู้คืนได้</span>`,
      showCancelButton: true,
      confirmButtonText: `ยืนยันลบข้อมูล`,
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      customClass: {
        popup: "rounded-2xl bg-slate-800 text-slate-100 border border-slate-700",
        title: "text-slate-100 font-bold",
        htmlContainer: "text-slate-300",
      },
    });

    if (!confirm.isConfirmed) return;

    try {
      const response = await fetch(`${API_URL}/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete, status: ${response.status}`);
      }

      setUsers((prev) => prev.filter((item) => String(item.id || item._id) !== userId));

      await Swal.fire({
        icon: "success",
        title: "ลบข้อมูลเรียบร้อยแล้ว",
        text: `ลบข้อมูลสำเร็จ`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถลบข้อมูลผู้ใช้งานได้ ลองรีเฟรชหน้าเว็บอีกครั้ง",
        confirmButtonColor: "#6366f1",
      });
    }
  };

  // -------------------------------------------------------------
  // 📌 Loading Screen แบบ Herta Kuru Kuru~
  // -------------------------------------------------------------
  if (!isAuthenticated || isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900 overflow-hidden">
        <RainEffect /> {/* ให้มีฝนตกเป็นพื้นหลังด้วย */}
        <div className="relative z-10 flex flex-col items-center">
          <img
            src="/hsr-honkai.gif"
            alt="Loading Herta"
            className="w-48 h-48 object-contain"
          />
          <p className="mt-6 font-bold text-lg text-indigo-400 tracking-wider animate-pulse drop-shadow-md text-center">
            Kuru Kuru~ กำลังตรวจสอบสิทธิ์และโหลดข้อมูล...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        <RainEffect />
        <div className="relative z-10 bg-slate-800/80 backdrop-blur-xl border border-red-500/20 rounded-2xl p-8 shadow-2xl text-center max-w-sm">
          <div className="w-12 h-12 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-100 mb-1">
            เกิดข้อผิดพลาดในการดึงข้อมูล
          </h3>
          <p className="text-slate-400 text-sm mb-6">
            ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ในขณะนี้
          </p>
          <button
            onClick={fetchUsers}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <RainEffect />
      <div className="max-w-5xl mx-auto space-y-6 relative z-10">
        <div className="bg-slate-800/60 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                ● เข้าสู่ระบบแล้ว
              </span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent mt-1">
              จัดการรายชื่อสมาชิก
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">
              จำนวนสมาชิกทั้งหมด{" "}
              <span className="text-indigo-400 font-semibold">
                {users.length}
              </span>{" "}
              คน
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl text-sm font-medium transition-all shadow-lg shadow-rose-500/5 active:scale-95 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              ออกจากระบบ (Logout)
            </button>
          </div>
        </div>

        {users.length === 0 ? (
          <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-12 text-center">
            <div className="w-12 h-12 bg-slate-700/50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-200 mb-1">ยังไม่มีข้อมูลสมาชิก</h3>
            <p className="text-slate-400 text-sm">ไม่มีรายชื่อผู้ใช้งานอยู่ในระบบในขณะนี้</p>
          </div>
        ) : (
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
            
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-700/70 bg-slate-800/80 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="py-4 px-6 text-center w-20">ลำดับ</th>
                    <th className="py-4 px-6">ชื่อ - นามสกุล</th>
                    <th className="py-4 px-6">Username / Email</th>
                    <th className="py-4 px-6 text-center w-48">จัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/40 text-sm">
                  {users.map((user, index) => {
                    const userId = (user.id || user._id) ? String(user.id || user._id) : `fallback-${index}`;
                    
                    return (
                      <tr key={userId} className="hover:bg-slate-700/50 transition-colors group">
                        <td className="py-4 px-6 text-center text-slate-400 font-mono">
                          {String(index + 1).padStart(2, "0")}
                        </td>
                        <td className="py-4 px-6 font-medium text-slate-200">
                          {user.firstname || "ไม่มีชื่อ"} {user.lastname || ""}
                        </td>
                        <td className="py-4 px-6 text-slate-400 font-mono text-xs">
                          {user.username || user.email || "-"}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEdit(userId)}
                              className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded-lg text-xs font-medium transition-all active:scale-95"
                            >
                              แก้ไข
                            </button>
                            <button
                              onClick={() => handleDelete(user)}
                              className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg text-xs font-medium transition-all active:scale-95"
                            >
                              ลบ
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-slate-700/50">
              {users.map((user, index) => {
                const userId = (user.id || user._id) ? String(user.id || user._id) : `fallback-${index}`;
                
                return (
                  <div key={userId} className="p-5 space-y-3 hover:bg-slate-700/20 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                          #{String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-semibold text-slate-100 mt-2 text-base">
                          {user.firstname || "ไม่มีชื่อ"} {user.lastname || ""}
                        </h3>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">
                          {user.username || user.email || "-"}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleEdit(userId)}
                        className="flex-1 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded-xl text-xs font-medium transition-all active:scale-95"
                      >
                        แก้ไข
                      </button>
                      <button
                        onClick={() => handleDelete(user)}
                        className="flex-1 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg text-xs font-medium transition-all active:scale-95"
                      >
                        ลบ
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}