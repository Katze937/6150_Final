import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';  // 後端 API 基本 URL

  constructor(private http: HttpClient) {}

  // 註冊
  register(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { email, password });
  }

  // 登入
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api`, { email, password });
  }

  // 獲取用戶資料
  getProfile(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/profile`, { headers });
  }
}
