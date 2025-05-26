"use client";

import Link from 'next/link';
import { BlogPost } from '@/types';
import { formatDate, getSummary } from '@/lib/blog';

interface BlogCardProps {
  blog: BlogPost;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const { id, title, content, date } = blog;
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <Link href={`/blog/${id}`} className="hover:underline">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 transition-colors duration-200">
              {title}
            </h2>
          </Link>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(date)}
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mt-3 mb-4">
          {getSummary(content)}
        </p>
        
        <div className="mt-4">
          <Link 
            href={`/blog/${id}`} 
            className="inline-block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
          >
            Read more →
          </Link>
        </div>
      </div>
    </div>
  );
}