"use client";

import { useBlogContext } from '@/context/BlogContext';
import { useParams, useRouter } from 'next/navigation';
import { formatDate } from '@/lib/blog';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function BlogDetail() {
  const params = useParams();
  const router = useRouter();
  const { getBlogById } = useBlogContext();
  
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const blog = getBlogById(id);
  
  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Blog post not found</h1>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => router.push('/')}>
          Return to Home
        </Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <Button
        variant="ghost"
        className="mb-6 flex items-center gap-2" 
        onClick={() => router.push('/')}
      >
        <ArrowLeft size={16} />
        Back to all blogs
      </Button>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden p-8">
        <div className="mb-6">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
              {blog.title}
            </h1>
            <span className="text-slate-500 dark:text-slate-400">
              {formatDate(blog.date)}
            </span>
          </div>
        </div>
        
        <div className="prose dark:prose-invert max-w-none">
          {blog.content.split("\n").map((paragraph, index) => (
            <p key={index} className="text-slate-700 dark:text-slate-300 mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}