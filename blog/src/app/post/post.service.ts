import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3000/api/posts';  // API 根路徑

  constructor(private http: HttpClient) {}

  // 獲取帖子列表，支持分頁和搜索
  getPosts(page: number, postsPerPage: number, searchQuery: string, id:string): Observable<Post> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('postsPerPage', postsPerPage.toString())
      .set('searchQuery', searchQuery);

    return this.http.get<Post>(`${this.apiUrl}/${id}`);

  }
  updatePost(id: string, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${id}`, post);
  }
  // 根據標籤篩選帖子
  getPostsByTag(tag: string, page: number, postsPerPage: number): Observable<any> {
    let params = new HttpParams()
      .set('tag', tag)
      .set('page', page.toString())
      .set('postsPerPage', postsPerPage.toString());

    return this.http.get<any>(`${this.apiUrl}/by-tag`, { params });
  }

  // 獲取標籤
  getTags(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/tags`);
  }
}
