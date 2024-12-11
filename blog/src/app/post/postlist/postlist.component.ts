import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  currentPage = 1;
  postsPerPage = 5;
  totalPosts = 0;
  tags: string[] = [];
  searchQuery: string = '';

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.getPosts();
    this.getTags();
  }

  // 獲取帖子列表
  getPosts(): void {
    this.postService.getPosts(this.currentPage, this.postsPerPage, this.searchQuery).subscribe(
      (response) => {
        this.posts = response.posts;
        this.totalPosts = response.totalPosts;
      },
      (error) => {
        console.error('Error fetching posts:', error);
        alert('Failed to load posts.');
      }
    );
  }

  // 獲取標籤
  getTags(): void {
    this.postService.getTags().subscribe(
      (tags) => {
        this.tags = tags;
      },
      (error) => {
        console.error('Error fetching tags:', error);
      }
    );
  }

  // 分頁邏輯
  onPageChange(page: number): void {
    this.currentPage = page;
    this.getPosts();
  }

  // 篩選帖子
  onFilter(tag: string): void {
    this.searchQuery = '';
    this.postService.getPostsByTag(tag, this.currentPage, this.postsPerPage).subscribe(
      (response) => {
        this.posts = response.posts;
        this.totalPosts = response.totalPosts;
      },
      (error) => {
        console.error('Error filtering posts by tag:', error);
      }
    );
  }

  // 搜索帖子
  onSearch(): void {
    this.currentPage = 1;
    this.getPosts();
  }

  // 查看帖子詳細內容
  onViewPost(postId: string): void {
    this.router.navigate(['/post', postId]);
  }
}
