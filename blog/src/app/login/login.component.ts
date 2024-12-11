import { Component } from '@angular/core';
//import { AuthService } from '../auth/auth.service';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  //constructor(private authService: AuthService) {}
  constructor(private apiService: ApiService) {}

  onSubmit() {
    // 測試 API 請求
    this.apiService.testLogin(this.email, this.password).subscribe(
      (response) => {
        console.log('Login successful!', response);
        // 在這裡處理登入成功的邏輯
      },
      (error) => {
        console.error('Login failed!', error);
      }
    );
  }


  // onSubmit() {
  //   this.authService.login(this.email, this.password).subscribe(
  //     (response) => {
  //       localStorage.setItem('token', response.token);  // 儲存 JWT
  //       this.message = 'Login successful!';
  //       this.router.navigate(['/profile']);  // 跳轉到用戶資料頁面
  //     },
  //     (error) => {
  //       alert('Login failed, please check your account or password.')
  //       console.error('Login failed', error);
  //     }
  //   );
  // }
}
