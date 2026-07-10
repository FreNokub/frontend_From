import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo - ใช้เอฟเฟกต์สีไล่ระดับ */}
          <Link 
            href="/" 
            className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            MyWebsite
          </Link>

          {/* Menu */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              หน้าแรก
            </Link>

            <Link
              href="/about"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              เกี่ยวกับ
            </Link>

            <Link
              href="/service"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              บริการของเรา
            </Link>

            <Link
              href="/contact"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              ติดต่อ
            </Link>

            {/* ปุ่มสมัครสมาชิก - ทำให้เป็นปุ่มเด่น (Call to action) */}
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold shadow-md shadow-blue-500/30 transition-all hover:-translate-y-0.5"
            >
              สมัครสมาชิก
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}