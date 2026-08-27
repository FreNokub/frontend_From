'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Swal from 'sweetalert2'

// 🌧️ Component เอฟเฟกต์ฝนตก (ธีมสายฝนสีฟ้าไซเบอร์)
const RainEffect = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const rainDrops = []
    const maxRainDrops = 100

    for (let i = 0; i < maxRainDrops; i++) {
      rainDrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 22 + 10,
        speed: Math.random() * 5 + 3,
        opacity: Math.random() * 0.5 + 0.15,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.lineCap = 'round'

      rainDrops.forEach((drop) => {
        ctx.beginPath()
        ctx.moveTo(drop.x, drop.y)
        ctx.lineTo(drop.x, drop.y + drop.length)
        ctx.strokeStyle = `rgba(56, 189, 248, ${drop.opacity})`
        ctx.lineWidth = 1.2
        ctx.stroke()

        drop.y += drop.speed

        if (drop.y > canvas.height) {
          drop.y = -drop.length
          drop.x = Math.random() * canvas.width
        }
      })
      requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-70 mix-blend-screen"
    />
  )
}

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // จำลองชื่อผู้ใช้จากอีเมลที่พิมพ์เข้ามา
    const username = email.split('@')[0] || 'ผู้ใช้งาน'

    // บันทึกสถานะลงในเครื่อง
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userName', username)

    // แจ้งเตือนสวยๆ ด้วย SweetAlert2 ธีมเข้ากัน
    await Swal.fire({
      icon: 'success',
      title: 'เข้าสู่ระบบสำเร็จ',
      timer: 1000,
      showConfirmButton: false,
      customClass: {
        popup: 'rounded-2xl bg-slate-900 text-slate-100 border border-blue-500/30',
        title: 'text-slate-100 font-bold',
      },
    })

    // บังคับรีเฟรชหน้าเว็บเล็กน้อยเพื่อให้ Navbar อัปเดตสถานะทันที แล้วพาไปหน้า Home
    window.location.href = '/'
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 sm:px-6 relative overflow-hidden font-sans">
      {/* 🌧️ สายฝนตกเบื้องหลัง */}
      <RainEffect />

      {/* 🔵 แสง Glow บรรยากาศพื้นหลัง */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* 📦 กล่อง Card เข้าสู่ระบบ */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-slate-900/70 backdrop-blur-xl p-6 sm:p-8 shadow-2xl border border-blue-500/20 shadow-blue-950/50 space-y-6">
        
        {/* Header & Logo Icon */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30 border border-blue-400/30">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-100 to-blue-300 bg-clip-text text-transparent">
            เข้าสู่ระบบ
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            กรุณากรอกอีเมลและรหัสผ่านของคุณ
          </p>
        </div>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">อีเมล</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800/60 border border-slate-700/80 text-slate-100 placeholder-slate-500 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="name@example.com"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">รหัสผ่าน</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800/60 border border-slate-700/80 text-slate-100 placeholder-slate-500 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full py-3 px-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm rounded-xl shadow-lg shadow-blue-600/25 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
        </form>

        {/* Footer Link */}
        <p className="mt-6 text-center text-xs text-slate-400">
          ยังไม่มีบัญชีใช่หรือไม่? <Link href="/sign-up" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors hover:underline">สมัครสมาชิก</Link>
        </p>
      </div>
    </main>
  )
}