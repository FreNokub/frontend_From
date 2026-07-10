"use client";

import React, { useState, useEffect } from 'react';

export default function FormRegister() {
  const [form, setForm] = useState({
    txt_firstname: "",
    txt_lastname: "",
    txt_email: "",
    txt_phone: "",
    txt_address: ""
  });

  // เก็บข้อมูลที่เกี่ยวข้องกับการสกรอลและเอฟเฟกต์ผิวน้ำไว้ใน State ทั้งหมด
  const [scrollState, setScrollState] = useState({
    waveScale: 0,         // ความแรงของคลื่นน้ำ
    lastScrollY: 0,       // ตำแหน่งสกรอลล่าสุด
    scrollTimeoutId: null // ID ของ Timeout สำหรับเคลียร์อนิเมชันตอนหยุดสกรอล
  });

  useEffect(() => {
    // กำหนดค่าตำแหน่งเริ่มต้นเมื่อ Component Mount ครั้งแรกบน Client
    setScrollState(prev => ({
      ...prev,
      lastScrollY: window.scrollY
    }));

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrollState((prev) => {
        // เคลียร์ Timeout เก่าออกก่อนผ่าน ID ที่เก็บอยู่ใน State
        if (prev.scrollTimeoutId) {
          clearTimeout(prev.scrollTimeoutId);
        }

        // คำนวณหาผลต่างเพื่อวัดความเร็วในการหมุนล้อเมาส์
        const delta = Math.abs(currentScrollY - prev.lastScrollY);
        // ปรับความแรงการสั่น (สูงสุดไม่เกิน 25 เพื่อไม่ให้บิดเบี้ยวจนเกินไป)
        const nextScale = Math.min(delta * 0.4, 25);

        // ตั้งเวลาตรวจสอบเมื่อผู้ใช้หยุดสกรอลเมาส์
        const newTimeoutId = setTimeout(() => {
          triggerFadeOut();
        }, 50);

        return {
          waveScale: nextScale,
          lastScrollY: currentScrollY,
          scrollTimeoutId: newTimeoutId
        };
      });
    };

    // ฟังก์ชันย่อยทำหน้าที่ค่อยๆ คลายตัวสั่นให้ผิวน้ำกลับมานิ่งสนิท
    const triggerFadeOut = () => {
      setScrollState((prev) => {
        if (prev.waveScale <= 0.1) {
          return { ...prev, waveScale: 0, scrollTimeoutId: null };
        }

        // ค่อยๆ ลดความแรงลงรอบละ 15% จนกว่าจะเหลือ 0
        const nextScale = prev.waveScale * 0.85;
        const nextTimeoutId = setTimeout(triggerFadeOut, 16); // ทำงานล้อไปกับความเร็ว 60fps

        return {
          ...prev,
          waveScale: nextScale,
          scrollTimeoutId: nextTimeoutId
        };
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // ทำความสะอาดและเคลียร์ Timeout ออกจากระบบเมื่อ Unmount
      setScrollState((prev) => {
        if (prev.scrollTimeoutId) clearTimeout(prev.scrollTimeoutId);
        return prev;
      });
    };
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4 py-12">
      
      {/* ส่วนของ SVG Filter สร้างลวดลายผิวน้ำพริ้วไหว */}
      <svg className="hidden">
        <defs>
          <filter id="water-wave">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.01 0.05" 
              numOctaves="3" 
              result="noise" 
            />
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale={scrollState.waveScale} 
              xChannelSelector="R" 
              yChannelSelector="G" 
            />
          </filter>
        </defs>
      </svg>

      {/* ตัวฟอร์มหลักที่จะสั่นไหวตามค่าใน State */}
      <div 
        style={{ filter: scrollState.waveScale > 0 ? 'url(#water-wave)' : 'none' }}
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-2xl will-change-transform"
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-center text-white">
          <h1 className="text-2xl font-extrabold tracking-wide">
            สร้างบัญชีผู้ใช้ใหม่
          </h1>
          <p className="text-blue-100 text-sm mt-1">
            กรุณากรอกข้อมูลเพื่อลงทะเบียนนะฮาฟฟู่ว
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          
          {/* Firstname & Lastname Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">
                ชื่อจริง
              </label>
              <input 
                type="text" 
                name="txt_firstname" 
                value={form.txt_firstname} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                placeholder="กรอกชื่อจริง" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">
                นามสกุล
              </label>
              <input 
                type="text" 
                name="txt_lastname" 
                value={form.txt_lastname} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                placeholder="กรอกนามสกุล" 
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">
              อีเมล
            </label>
            <input 
              type="email" 
              name="txt_email" 
              value={form.txt_email} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
              placeholder="example@email.com" 
            />
          </div>

          {/* Phone Field */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">
              เบอร์โทรศัพท์
            </label>
            <input 
              type="tel" 
              name="txt_phone" 
              value={form.txt_phone} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
              placeholder="0XXX XXX XXX" 
            />
          </div>

          {/* Address Field */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">
              ที่อยู่
            </label>
            <textarea 
              name="txt_address" 
              value={form.txt_address} 
              onChange={handleChange} 
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none" 
              placeholder="กรอกที่อยู่ปัจจุบันของคุณ" 
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full mt-2 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform active:scale-[0.98] transition-all duration-150"
          >
            สมัครสมาชิก
          </button>
          
        </form>
      </div>
    </div>
  );
}
