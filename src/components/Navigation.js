'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function Navigation() {
  const [token, setToken] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [userName, setUserName] = useState('ggggzz')
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // 📌 ดึงและอัปเดต token เมื่อมีการเปลี่ยนหน้า (pathname)
  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    setToken(storedToken)
  }, [pathname])

  // 📌 ตรวจสอบการ Scroll หน้าจอ
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 📌 ฟังก์ชัน Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token")
    setToken(null)
    router.push("/login")
  }

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Service', href: '/service' },
    { name: 'Users List', href: '/users' }, // เพิ่มลิงก์ไปยังหน้า Users
    { name: 'Contact', href: '/contact' }
  ]

  return (
    <nav 
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled 
          ? 'bg-zinc-950/80 backdrop-blur-xl py-3 shadow-[0_10px_40px_-10px_rgba(6,182,212,0.15)]' 
          : 'bg-zinc-950/60 backdrop-blur-md py-5 shadow-[0_4px_30px_rgba(6,182,212,0.08)]'
      }`}
    >
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.5)] opacity-80"></div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/30 via-transparent to-transparent opacity-70"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group transition-transform duration-300 active:scale-95 z-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black border border-cyan-500/30 text-white font-bold shadow-[0_0_15px_rgba(34,211,238,0.3)] group-hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] group-hover:border-cyan-400 transition-all duration-300">
              M
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-[15px] font-semibold tracking-tight text-white group-hover:text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0)] group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all duration-300">
                Book Haven
              </h1>
              <p className="text-[11px] font-medium text-zinc-500 group-hover:text-cyan-500/70 transition-colors">Next.js • Tailwind</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2 lg:gap-6 z-10">
            <div className="flex items-center gap-1 bg-zinc-900/50 p-1 rounded-full border border-zinc-800 shadow-inner">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (pathname === '/' && item.name === 'Home')
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-5 py-2 text-sm font-medium transition-all duration-300 rounded-full
                      ${isActive 
                        ? 'text-cyan-300 bg-zinc-800 shadow-[0_0_15px_rgba(34,211,238,0.2)] border border-cyan-500/30' 
                        : 'text-zinc-400 hover:text-cyan-400 hover:bg-zinc-800/50 border border-transparent hover:shadow-[0_0_10px_rgba(34,211,238,0.1)]'
                      }`}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>

            <div className="w-px h-6 bg-gradient-to-b from-transparent via-zinc-700 to-transparent mx-2" />

            {/* User Area / Auth */}
            <div className="flex items-center">
              {token ? (
                <div className="flex items-center gap-4">
                  <Link href="/users" className="flex items-center gap-2 group cursor-pointer">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-zinc-900 border border-cyan-500/40 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] group-hover:border-cyan-400 transition-all duration-300">
                      👤
                    </div>
                    <span className="text-sm font-medium text-zinc-300 group-hover:text-cyan-300 drop-shadow-[0_0_5px_rgba(34,211,238,0)] group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all">
                      {userName}
                    </span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-sm font-medium text-rose-400 hover:text-rose-300 hover:drop-shadow-[0_0_8px_rgba(244,63,94,0.6)] transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link 
                    href="/register" 
                    className="text-sm font-medium text-zinc-400 hover:text-cyan-400 px-4 py-2 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all duration-200"
                  >
                    สมัครสมาชิก
                  </Link>
                  <Link 
                    href="/login" 
                    className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white rounded-full bg-cyan-600 hover:bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.7)] transition-all duration-300 active:scale-95"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden z-10">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="group rounded-full p-2.5 text-zinc-400 hover:bg-zinc-800 hover:text-cyan-400 transition-colors duration-300 focus:outline-none"
            >
              <div className="w-5 h-4 flex flex-col justify-between items-center relative">
                <span className={`block h-[1.5px] w-5 bg-current rounded-full transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-[7px] shadow-[0_0_8px_rgba(34,211,238,0.8)]' : ''}`} />
                <span className={`block h-[1.5px] w-5 bg-current rounded-full transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-[1.5px] w-5 bg-current rounded-full transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-[7px] shadow-[0_0_8px_rgba(34,211,238,0.8)]' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-zinc-800/80 pt-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-zinc-300 hover:text-cyan-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-zinc-800 pt-3 flex flex-col gap-2">
              {token ? (
                <>
                  <Link
                    href="/users"
                    onClick={() => setIsOpen(false)}
                    className="text-cyan-400 px-3 py-2 text-sm font-medium flex items-center gap-2"
                  >
                    👤 {userName}
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="text-left text-rose-400 hover:text-rose-300 px-3 py-2 text-sm font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="text-zinc-300 hover:text-cyan-400 px-3 py-2 text-sm font-medium"
                  >
                    สมัครสมาชิก
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-cyan-400 hover:text-cyan-300 px-3 py-2 text-sm font-medium"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}