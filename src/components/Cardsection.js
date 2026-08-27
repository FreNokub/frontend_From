import Image from 'next/image';

export default function Cardsection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
       
        {/* หัวข้อ Section */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">สินค้าแนะนำ</h2>
          <p className="mt-2 text-gray-600">เลือกชมสินค้าที่น่าสนใจของเราในเดือนนี้</p>
        </div>

        {/* ตะแกรง Grid แบบ 3 คอลัมน์ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         
          {/* ==================== การ์ดใบที่ 1 ==================== */}
          <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white">
            <div className="relative w-full h-48 bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"
                alt="หูฟังไร้สาย Noise Cancelling"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                หูฟังไร้สาย Noise Cancelling
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                ตัดเสียงรบกวนได้ดีเยี่ยม แบตเตอรี่ใช้งานได้ยาวนาน 30 ชั่วโมง
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-blue-600">฿4,990</span>
                <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
                  เพิ่มลงตะกร้า
                </button>
              </div>
            </div>
          </div>

          {/* ==================== การ์ดใบที่ 2 ==================== */}
          <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white">
            <div className="relative w-full h-48 bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"
                alt="กล้อง Mirrorless 4K"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                กล้อง Mirrorless 4K
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                กล้องดิจิตอลความละเอียดสูง พร้อมเลนส์คิท 15-45mm
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-blue-600">฿25,900</span>
                <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
                  เพิ่มลงตะกร้า
                </button>
              </div>
            </div>
          </div>

          {/* ==================== การ์ดใบที่ 3 ==================== */}
          <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white">
            <div className="relative w-full h-48 bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80"
                alt="นาฬิกาสมาร์ทวอทช์"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                นาฬิกาสมาร์ทวอทช์
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                ติดตามการออกกำลังกาย วัดอัตราการเต้นของหัวใจ กันน้ำได้
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-blue-600">฿3,200</span>
                <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
                  เพิ่มลงตะกร้า
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}