import Navbar from "@/components/Navigation"; // N ตัวใหญ่
import { Prompt } from "next/font/google";
import "../globals.css";

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
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}