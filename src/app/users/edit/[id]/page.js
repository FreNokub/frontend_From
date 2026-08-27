"use client";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter, useParams } from "next/navigation";

export default function EditUserForm() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [form, setForm] = useState({
    txt_firstname: "",
    txt_lastname: "",
    txt_username: "",
    txt_password: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 1. ดึงข้อมูลเดิมมาแสดงเมื่อเปิดหน้านี้
  useEffect(() => {
    const fetchOldData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://6a7e6ff43183f5fd884a1562.mockapi.io/api/product/${id}`);
        if (response.ok) {
          const data = await response.json();
          const userData = Array.isArray(data) ? data[0] : data;

          setForm({
            txt_firstname: userData.firstname || "",
            txt_lastname: userData.lastname || "",
            txt_username: userData.username || "",
            txt_password: "",
          });
        } else {
          throw new Error("Failed to load user data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        await Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถโหลดข้อมูลผู้ใช้งานได้",
          confirmButtonColor: "#6366f1",
        });
        router.push("/users");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchOldData();
  }, [id, router]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ตรวจสอบความถูกต้องของข้อมูล
  const validateForm = () => {
    if (!form.txt_firstname.trim()) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาระบุชื่อ",
        text: "กรุณากรอกชื่อ",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#6366f1",
      });
      return false;
    }

    if (!form.txt_lastname.trim()) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาระบุนามสกุล",
        text: "กรุณากรอกนามสกุล",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#6366f1",
      });
      return false;
    }

    if (!form.txt_username.trim()) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาระบุ Username",
        text: "กรุณากรอก Username",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#6366f1",
      });
      return false;
    }

    return true;
  };

  // 2. ส่งข้อมูลที่แก้ไขแล้วไปยัง API
  const handleSubmit = async (e) => {
    e.preventDefault();

    // เรียกใช้ validateForm หากไม่ผ่านให้หยุดการทำงานทันที
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`https://api.itdev.cmtc.ac.th/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: form.txt_firstname,
          lastname: form.txt_lastname,
          username: form.txt_username,
          ...(form.txt_password && { password: form.txt_password }),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "แก้ไขข้อมูลสำเร็จ",
          text: "อัปเดตข้อมูลผู้ใช้เรียบร้อยแล้ว",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#6366f1",
          customClass: { popup: "rounded-2xl" },
        });
        router.push("/users");
      } else {
        await Swal.fire({
          icon: "error",
          title: `เกิดข้อผิดพลาด (${response.status})`,
          text: result.message || "ไม่สามารถแก้ไขข้อมูลได้",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#ef4444",
          customClass: { popup: "rounded-2xl" },
        });
      }
    } catch (error) {
      await Swal.fire({
        icon: "warning",
        title: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
        text: "กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต แล้วลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#ef4444",
        customClass: { popup: "rounded-2xl" },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="border-b border-slate-700/60 p-6 sm:p-8 bg-slate-800/40">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
            แก้ไขข้อมูลสมาชิก
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            ปรับปรุงรายละเอียดข้อมูลบัญชีผู้ใช้งานในระบบ
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="p-6 sm:p-8 space-y-6 animate-pulse">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-12 bg-slate-700/40 rounded-xl" />
              <div className="h-12 bg-slate-700/40 rounded-xl" />
            </div>
            <div className="h-12 bg-slate-700/40 rounded-xl" />
            <div className="h-12 bg-slate-700/40 rounded-xl" />
            <div className="h-12 bg-slate-700/40 rounded-xl w-1/3" />
          </div>
        ) : (
          /* Form Section */
          <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 space-y-5">
            {/* Firstname & Lastname Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  ชื่อ <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  name="txt_firstname"
                  value={form.txt_firstname}
                  onChange={handleChange}
                  placeholder="กรอกชื่อจริง"
                  className="w-full bg-slate-900/60 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  นามสกุล <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  name="txt_lastname"
                  value={form.txt_lastname}
                  onChange={handleChange}
                  placeholder="กรอกนามสกุล"
                  className="w-full bg-slate-900/60 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                ชื่อผู้ใช้งาน (Username) <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                name="txt_username"
                value={form.txt_username}
                onChange={handleChange}
                placeholder="กรอกชื่อผู้ใช้งาน"
                className="w-full bg-slate-900/60 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                รหัสผ่านใหม่
                <span className="text-slate-400 text-xs font-normal ml-2">
                  (เว้นว่างไว้หากไม่ต้องการเปลี่ยน)
                </span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="txt_password"
                  value={form.txt_password}
                  onChange={handleChange}
                  placeholder="ตั้งรหัสผ่านใหม่"
                  className="w-full bg-slate-900/60 border border-slate-700 rounded-xl pl-4 pr-11 py-2.5 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors p-1"
                >
                  {showPassword ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.018 10.018 0 013.682-.763c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m-1.748 1.748L3 3l18 18"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-700/50">
              <button
                type="button"
                onClick={() => router.push("/users")}
                disabled={isSubmitting}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-slate-300 border border-slate-600/50 rounded-xl text-sm font-medium transition-all active:scale-95 disabled:opacity-50"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-indigo-600/25 hover:shadow-indigo-500/40 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    กำลังบันทึก...
                  </>
                ) : (
                  "บันทึกการแก้ไข"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}