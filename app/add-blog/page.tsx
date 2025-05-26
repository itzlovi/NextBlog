"use client";

import BlogForm from '@/components/BlogForm';

export default function AddBlog() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-6 text-center">
        Create New Blog Post
      </h1>
      <BlogForm />
    </div>
  );
}