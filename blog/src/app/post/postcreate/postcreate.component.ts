import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service'; // 你需要創建一個服務來處理 API 請求
import { Router } from '@angular/router';

@Component({
  selector: 'app-postcreate',
  templateUrl: './postcreate.component.html',
  styleUrls: ['./postcreate.component.css']
})
export class PostCreateComponent implements OnInit {
  postForm: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', [Validators.required, Validators.minLength(10)]],
      tags: ['']  
    });
  }

  // 提交表單
  onSubmit(): void {
    if (this.postForm.invalid) {
      return;
    }

    const postData = this.postForm.value;
    this.postService.createPost(postData).subscribe(response => {
      console.log('Post created successfully:', response);
      this.router.navigate(['/post', response.id]);
    }, error => {
      console.error('Error creating post:', error);
      
    });
  }
}
