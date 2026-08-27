import Link from 'next/link'

export default function About() {
  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-gray-50 to-white text-gray-800">
      {/* Container หลัก จัดหน้าให้อยู่ตรงกลางอย่างสวยงาม */}
      <div className="mx-auto max-w-4xl px-6 py-16 text-center">
        
        {/* หัวข้อหน้าโปร่งตาและทันสมัย */}
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          About Our Company
        </h1>
        
        {/* เส้นคั่นดีไซน์บางเบา */}
        <div className="mx-auto my-6 h-1 w-12 rounded-full bg-blue-600" />
        
        {/* เนื้อหาจำลองอธิบายหน้านี้ */}
        <p className="mx-auto max-w-2xl text-lg text-gray-600 leading-relaxed">
          Welcome to our website. We build high-performance web applications using modern technologies like Next.js and Tailwind CSS to deliver the best user experiences.
        </p>

        {/* ส่วนของการ์ดข้อมูลเพิ่มเติม (เพิ่มความน่าเชื่อถือ) */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
            <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
            <p className="mt-2 text-sm text-gray-500">To create simple, beautiful, and accessible web solutions.</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
            <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
            <p className="mt-2 text-sm text-gray-500">Leading the industry with innovation and efficient code.</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
            <h3 className="text-xl font-bold text-gray-900">Our Values</h3>
            <p className="mt-2 text-sm text-gray-500">Quality, transparency, and continuous improvement.</p>
          </div>
        </div>

        {/* ปุ่ม CTA (Call to Action) สำหรับนำทางไปยังหน้าถัดไป */}
        <div className="mt-12 flex justify-center gap-4">
          <Link 
            href="/service" 
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/10 transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5"
          >
            Explore Services
          </Link>
          <Link 
            href="/" 
            className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-600 transition-all duration-300 hover:bg-gray-50 hover:text-gray-900"
          >
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  )
}
