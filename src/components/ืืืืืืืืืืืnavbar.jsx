import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 bg-zinc-900 border-b border-zinc-800 text-white">
      <div className="font-bold">My Website</div>
      <div className="flex space-x-6 items-center">
        <Link href="/" className="hover:text-blue-500">Home</Link>
        <Link href="/about" className="hover:text-blue-500">About</Link>
        
        {/* ใส่แท็ก Link ตรงนี้ */}
        <Link href="/sign-in" className="hover:text-blue-500">Sign In</Link>
        <Link href="/sign-up" className="hover:text-blue-500">Sign Up</Link>
      </div>
    </nav>
  );
}
