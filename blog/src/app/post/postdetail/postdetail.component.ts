import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: any;
  postId: string;
  newCommentBody: string;
  selectedParentCommentId: string | null = null;
  searchQuery: string;
  posts: any[] = []; // 用於顯示搜索結果

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    this.getPost();
  }

  getPost(): void {
    this.postService.getPost(this.postId).subscribe(post => {
      this.post = post;
    });
  }

  deletePost(): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(this.postId).subscribe(() => {
        this.router.navigate(['/posts']);
      });
    }
  }

  addComment(): void {
    const newComment = {
      body: this.newCommentBody,
      parentCommentId: this.selectedParentCommentId
    };
  
    this.postService.addComment(this.postId, newComment).subscribe(response => {
      console.log('Comment added!', response);
      this.getPost(); 
    });
  }

  likePost(): void {
    this.postService.likePost(this.postId).subscribe(response => {
      console.log('Post liked!');
    });
  }

  searchPosts(): void {
    this.postService.searchPosts(this.searchQuery).subscribe(posts => {
      this.posts = posts;
    });
  }
  

}


