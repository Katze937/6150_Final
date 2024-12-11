import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-postedit',
  templateUrl: './postedit.component.html',
  styleUrls: ['./postedit.component.css']
})
export class PostEditComponent implements OnInit {
  post: Post = { title: '', body: '', tags: [] };
  postId: string | null = null; // 改成可為 null 的型別

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    if (this.postId) {
      this.getPost();
    }
  }

  getPost(): void {
    if (!this.postId) {
      console.error('Post ID is null or undefined');
      return;
    }
    this.postService.getPost(this.postId).subscribe(post => {
      this.post = post;
    });
  }

  onSubmit(): void {
    if (!this.postId) {
      console.error('Post ID is null or undefined');
      return;
    }
    this.postService.updatePost(this.postId, this.post).subscribe(response => {
      console.log('Post updated successfully:', response);
      this.router.navigate(['/post', this.postId]);  // 跳轉到更新後的帖子的詳細頁面
    }, error => {
      console.error('Error updating post:', error);
    });
  }
}
