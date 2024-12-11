import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);  // 儲存 JWT
        this.message = 'Login successful!';
        this.router.navigate(['/profile']);  // 跳轉到用戶資料頁面
      },
      (error) => {
        alert('Login failed, please check your account or password.')
        console.error('Login failed', error);
      }
    );
  }
}
