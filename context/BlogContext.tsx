"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { BlogPost } from '@/types';

interface BlogContextType {
  blogs: BlogPost[];
  addBlog: (blog: Omit<BlogPost, 'id' | 'createdAt'>) => void;
  getBlogById: (id: string) => BlogPost | undefined;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children }: { children: React.ReactNode }) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  // When the app starts, get blogs from the browser's storage
  useEffect(() => {
    const storedBlogs = localStorage.getItem('blogs');
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    } else {
      // If there are no blogs, add some example ones
      const sampleBlogs: BlogPost[] = [
        {
          id: '1',
          title: 'Getting Started with Next.js',
          content: 'Next.js is a React framework that enables server-side rendering and static site generation. It provides an excellent developer experience with features like file-system routing, API routes, and built-in CSS support. In this blog post, we explore the basics of setting up a Next.js project and its core concepts.',
          date: '2025-05-15',
          createdAt: Date.now() - 86400000 * 7
        },
        {
          id: '2',
          title: 'Mastering Tailwind CSS',
          content: 'Tailwind CSS is a utility-first CSS framework that allows you to build modern websites without ever leaving your HTML. It provides low-level utility classes that let you build completely custom designs without fighting the framework. In this guide, we\'ll cover the fundamentals and advanced techniques to master Tailwind CSS.',
          date: '2025-05-20',
          createdAt: Date.now() - 86400000 * 3
        },
        {
          id: '3',
          title: 'TypeScript Best Practices',
          content: 'TypeScript adds static types to JavaScript, helping you catch errors early and making your code more robust. This post covers essential TypeScript patterns and practices that will help you write cleaner, more maintainable code. We\'ll explore interfaces, type inference, generics, and more to help you leverage TypeScript effectively in your projects.',
          date: '2025-05-25',
          createdAt: Date.now()
        }
      ];
      setBlogs(sampleBlogs);
      localStorage.setItem('blogs', JSON.stringify(sampleBlogs));
    }
  }, []);

  // Every time blogs change, save them in the browser's storage
  useEffect(() => {
    localStorage.setItem('blogs', JSON.stringify(blogs));
  }, [blogs]);

  // Add a new blog to the list
  const addBlog = (blog: Omit<BlogPost, 'id' | 'createdAt'>) => {
    const newBlog: BlogPost = {
      ...blog,
      id: Math.random().toString(36).substring(2, 15),
      createdAt: Date.now()
    };
    
    setBlogs(prevBlogs => {
      const updatedBlogs = [newBlog, ...prevBlogs];
      return updatedBlogs;
    });
  };

  // Find a blog by its ID
  const getBlogById = (id: string): BlogPost | undefined => {
    return blogs.find(blog => blog.id === id);
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, getBlogById }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlogContext() {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlogContext must be used within a BlogProvider');
  }
  return context;
}