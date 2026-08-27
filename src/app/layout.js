import Navbar from "@/components/Navigation";
import BackgroundVideo from "@/components/BackgroundVideo"; // << เพิ่มบรรทัดนี้เพื่อดึงคอมโพเนนต์วิดีโอมาใช้
import { Prompt } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["300"],
  variable: "--font-prompt",
});

export const metadata = {
  title: "Register App",
  description: "Next.js Register Form",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${prompt.variable} h-full antialiased`}
    >
      {/* เพิ่ม relative และสีพื้นหลัง (เผื่อวิดีโอโหลดไม่ทัน) ให้กับ body */}
      <body className="relative min-h-full flex flex-col bg-black text-white">
        
        {/* นำ BackgroundVideo มาใส่แทนแท็ก video เดิม */}
        <BackgroundVideo />

        {/* ห่อเนื้อหาด้วย div เพื่อตั้งค่า z-10 ให้อยู่เหนือวิดีโอ */}
        <div className="relative z-10 flex flex-col flex-grow h-full">
          <Navbar />
          {children}
        </div>
        
      </body>
    </html>
  );
}