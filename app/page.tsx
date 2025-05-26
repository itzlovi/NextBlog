"use client";

import { useBlogContext } from '@/context/BlogContext';
import BlogCard from '@/components/BlogCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircle, Newspaper } from 'lucide-react';

export default function Home() {
  const { blogs } = useBlogContext();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Latest Blog Posts</h1>
          <p className="text-slate-600 dark:text-slate-300 mt-2">
            Discover insights and stories from our writers
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/all-blogs">
            <Button variant="outline" className="flex items-center gap-2">
              <Newspaper size={18} />
              <span>Blog Details</span>
            </Button>
          </Link>
          <Link href="/add-blog">
            <Button className="flex items-center gap-2">
              <PlusCircle size={18} />
              <span>Add New Blog</span>
            </Button>
          </Link>
        </div>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-4">
            No blog posts yet
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Be the first to create a blog post!
          </p>
          <Link href="/add-blog">
            <Button size="lg" className="animate-pulse">
              Create Your First Post
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs
            .sort((a, b) => b.createdAt - a.createdAt)
            .map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
        </div>
      )}
    </div>
  );
}