import Navbar from "./components/navbar"; // อ้างอิง path ให้ตรงกับโฟลเดอร์ของคุณ
import "./globals.css"; // อย่าลืม import ไฟล์ CSS เพื่อให้ Tailwind ทำงาน

export const metadata = {
  title: "MyWebsite - เว็บไซต์ของฉัน",
  description: "รายละเอียดเว็บไซต์ของคุณ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      {/* ใช้พื้นหลังสีเทาอ่อนๆ เพื่อให้หน้าเว็บดูมีมิติ และให้ Navbar สีขาวเด่นขึ้นมา */}
      <body className="bg-slate-50 min-h-screen flex flex-col font-sans text-gray-900">
        
        <Navbar />

        {/* ส่วนแสดงเนื้อหาของแต่ละหน้า (Page content) */}
        <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
          {children}
        </main>
        
      </body>
    </html>
  );
}