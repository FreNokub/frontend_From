import Link from 'next/link';

export default function SignUp() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-zinc-900 rounded-xl border border-zinc-800">
        <h2 className="text-3xl font-bold text-center">สมัครสมาชิก</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">ชื่อผู้ใช้</label>
            <input type="text" placeholder="username" className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">อีเมล</label>
            <input type="email" placeholder="your@email.com" className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">รหัสผ่าน</label>
            <input type="password" placeholder="••••••••" className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-blue-500" required />
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 font-medium rounded transition">สร้างบัญชี</button>
        </form>
        <p className="text-sm text-center text-zinc-400">
          มีบัญชีอยู่แล้ว? <Link href="/sign-in" className="text-blue-500 hover:underline">เข้าสู่ระบบ</Link>
        </p>
      </div>
    </div>
  );
}
