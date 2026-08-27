export default function Footersection() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
       
        {/* แบ่งพื้นที่เป็น 3 คอลัมน์สำหรับจอใหญ่ และ 1 คอลัมน์สำหรับมือถือ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         
          {/* ==================== ส่วนที่ 1: ข้อมูลร้านค้า ==================== */}
          <div>
            <h2 className="text-white text-xl font-bold mb-4">NextShop</h2>
            <p className="text-sm leading-relaxed mb-4">
              แหล่งรวมสินค้าไอทีและแก็ดเจ็ตที่ทันสมัยที่สุด
              คัดสรรสินค้าคุณภาพเพื่อตอบโจทย์ทุกไลฟ์สไตล์ของคุณ
              พร้อมบริการจัดส่งทั่วประเทศ
            </p>
          </div>

          {/* ==================== ส่วนที่ 2: เมนูลัด (Quick Links) ==================== */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">เมนูลัด</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  หน้าแรก
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  สินค้าทั้งหมด
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  โปรโมชั่น
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  บทความ/รีวิว
                </a>
              </li>
            </ul>
          </div>

          {/* ==================== ส่วนที่ 3: ติดต่อเรา ==================== */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">ติดต่อเรา</h3>
            <ul className="space-y-2 text-sm">
              <li>📍 9 ถ.เวียงแก้ว ต.ศรีภูมิ อ.เมืองเชียงใหม่ จ.เชียงใหม่ 50200</li>
              <li>📞 02-123-4567 (จ.-ศ. 09:00 - 18:00)</li>
              <li>✉️ support@nextshop.com</li>
            </ul>
           
            {/* ปุ่ม Social Media แบบจำลอง (ใส่ลิงก์จริงที่ href) */}
            <div className="mt-4 flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <span className="sr-only">Facebook</span>
                <span className="text-white font-bold text-xs">FB</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 transition-colors">
                <span className="sr-only">Twitter</span>
                <span className="text-white font-bold text-xs">TW</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors">
                <span className="sr-only">Instagram</span>
                <span className="text-white font-bold text-xs">IG</span>
              </a>
            </div>
          </div>

        </div>

        {/* ==================== ส่วนล่างสุด: Copyright ==================== */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} NextShop. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
 