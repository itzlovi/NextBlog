"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  
  return (
    <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold tracking-tight">
              NextBlog
            </Link>
          </div>
          <nav className="flex space-x-8">
            <Link 
              href="/" 
              className={`transition-colors duration-200 hover:text-blue-300 ${
                pathname === '/' ? 'text-blue-300 border-b-2 border-blue-300' : 'text-gray-300'
              } py-2`}
            >
              Home
            </Link>
            <Link 
              href="/add-blog" 
              className={`transition-colors duration-200 hover:text-blue-300 ${
                pathname === '/add-blog' ? 'text-blue-300 border-b-2 border-blue-300' : 'text-gray-300'
              } py-2`}
            >
              Add Blog
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}