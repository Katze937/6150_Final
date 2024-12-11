import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  onSubmit() {
    if (this.email && this.password) {
      console.log('Register successful', this.email, this.password);
      // 在這裡可以處理向後端發送註冊請求
    } else {
      console.log('Please enter the entire inform');
    }
  }
}
