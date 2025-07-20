import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../../layout/component/app.floatingconfigurator';
import { AuthService } from '../../service/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { toastService } from '../../service/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator, ToastModule],
  templateUrl: './login.html',
  // template: `

  // `
})
export class Login {
  email: string = '';

  password: string = '';

  checked: boolean = false;

  loading = false;
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router, private messageService: MessageService,public toastService:toastService) {
  }


  login() {
    this.loading = true;
    this.errorMessage = '';
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.auth.saveToken(res.token);
        this.toastService.showToast('success', 'Success', 'Successfully Logedin');
        this.router.navigate(['/blog/blogs-list']);
      },
      error: (err) => {
        this.toastService.showToast('error', 'Error', 'Login Failed');
        console.error('Login failed', err);
        this.errorMessage = 'Login Failed';
      },
      complete: () => this.loading = false
    });
  }

  navigateToSignup() {
    console.log("singup")
    this.router.navigate(['/auth/signup']);
  }
}
