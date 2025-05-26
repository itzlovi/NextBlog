import { BlogPost } from "@/types";

// Make a random string to use as a blog post ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

// Turn a date into something easy to read, like "May 20, 2025"
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

// Give a short preview of the blog content
export function getSummary(content: string, maxLength: number = 100): string {
  if (content.length <= maxLength) return content;
  
  // If possible, cut off at a natural stopping point (like a period or question mark)
  const naturalBreak = content.substring(0, maxLength).search(/[.!?]\s/);
  if (naturalBreak !== -1 && naturalBreak < maxLength - 20) {
    return content.substring(0, naturalBreak + 2) + '...';
  }
  
  // If not, just cut off at the max length
  return content.substring(0, maxLength) + '...';
}