"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBlogContext } from '@/context/BlogContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";

export default function BlogForm() {
  const router = useRouter();
  const { addBlog } = useBlogContext();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  
  const [errors, setErrors] = useState({
    title: '',
    content: '',
    date: ''
  });
  
  const validateForm = () => {
    const newErrors = {
      title: '',
      content: '',
      date: ''
    };
    
    let isValid = true;
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }
    
    if (!content.trim()) {
      newErrors.content = 'Content is required';
      isValid = false;
    }
    
    if (!date) {
      newErrors.date = 'Date is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    addBlog({
      title,
      content,
      date
    });
    
    toast({
      title: "Success!",
      description: "Your blog post has been published.",
    });
    
    router.push('/');
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create New Blog Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={errors.date ? 'border-red-500' : ''}
            />
            {errors.date && (
              <p className="text-sm text-red-500">{errors.date}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog post content here..."
              className={`min-h-[200px] ${errors.content ? 'border-red-500' : ''}`}
            />
            {errors.content && (
              <p className="text-sm text-red-500">{errors.content}</p>
            )}
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => router.push('/')}
            >
              Cancel
            </Button>
            <Button type="submit">Publish Post</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}