"use client";

import { useBlogContext } from '@/context/BlogContext';
import BlogCard from '@/components/BlogCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function AllBlogsPage() {
  const { blogs } = useBlogContext();

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Blog Details</h1>
          <p className="text-slate-600 dark:text-slate-300 mt-2">
            Browse through all our published articles
          </p>
        </div>
        <Link href="/add-blog">
          <Button className="flex items-center gap-2">
            <PlusCircle size={18} />
            <span>Add New Blog</span>
          </Button>
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-4">
            No blog posts yet
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            It looks like there are no blogs published at the moment.
          </p>
          <Link href="/add-blog">
            <Button size="lg">
              Create the First Post
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-700">
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Blog Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Upload Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {blogs
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map(blog => {
                      const blogDate = new Date(blog.date);
                      return (
                        <tr key={blog.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                          <td className="px-6 py-4">
                            <Link href={`/blog/${blog.id}`} className="text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                              {blog.title}
                            </Link>
                          </td>
                          <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                            {blogDate.toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                            {blogDate.toLocaleTimeString()}
                          </td>
                          <td className="px-6 py-4">
                            <Link 
                              href={`/blog/${blog.id}`}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                            >
                              View Details
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}