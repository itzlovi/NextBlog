export interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  createdAt: number; // timestamp for sorting
}