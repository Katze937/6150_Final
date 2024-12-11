export interface Post {
    id: string;
    title: string;
    body: string;
    tags: string[];
    date: string;
    comments?: Comment[];
}
  
export interface Comment {
  id: string;
  body: string;
  replies: Comment[];
}
export interface PostListResponse {
  posts: Post[];
  totalPosts: number;
}