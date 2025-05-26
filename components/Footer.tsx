"use client";

import { Github, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-2">NextBlog</h3>
            <p className="text-slate-300 text-sm">
              Share your thoughts with the world
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <Link 
              href="https://github.com" 
              target="_blank"
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              <Github size={20} />
            </Link>
            <Link 
              href="https://twitter.com" 
              target="_blank"
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              <Twitter size={20} />
            </Link>
            <Link 
              href="https://linkedin.com" 
              target="_blank"
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              <Linkedin size={20} />
            </Link>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} NextBlog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}