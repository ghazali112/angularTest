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
import { toastService } from '../../service/toast.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    RouterModule,
    RippleModule,
    AppFloatingConfigurator
  ],
  templateUrl: './signup.html',
})
export class signup {
  email: string = '';
  name: string = '';
  password: string = '';
  loading = false;
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router,private messageService: MessageService,public toastService:toastService) { }

  register() {
    const data = {
      email: this.email,
      password: this.password,
      name: this.name
    };

    this.loading = true;
    this.auth.register(data).subscribe({
      next: (res) => {
        console.log('Registered:', res);
         this.toastService.showToast('success', 'Success', 'Successfully Registered');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Registration faileds', err);
         this.toastService.showToast('error', 'Error', 'Something went wrong. Please try again.');
        this.errorMessage = 'Something went wrong. Please try again.';
        this.loading = false;
      }
    });
  }

  navigateTologin() {
    this.router.navigate(['/auth/login']);
  }
}
