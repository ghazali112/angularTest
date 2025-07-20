import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppFloatingConfigurator } from '../../../layout/component/app.floatingconfigurator';
import { AppTopbar } from '../../../layout/component/top-bar/app.topbar';
import { BlogPost, BlogService } from '../../service/blog.service';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    RippleModule,
    AppFloatingConfigurator,
    AppTopbar,ToastModule
  ],
  templateUrl: './create-blog.html',
})
export class createBlog implements OnInit {
  blogForm!: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    const author = this.getAuthorFromToken() || 'Unknown Author';

    this.blogForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      content: [
        '',
        [Validators.required, Validators.minLength(10)],
      ],
      author: [{ value: author, disabled: true }, Validators.required],
    });
  }

  getAuthorFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.name || payload.email || null;
    } catch {
      return null;
    }
  }

  onSubmit(): void {
    if (this.blogForm.invalid) {
      this.blogForm.markAllAsTouched();
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'Authentication token not found.';
      return;
    }

    const blogData: BlogPost = {
      ...this.blogForm.getRawValue(),
      id: '', // temporary ID will be generated in BlogService
      publishedAt: new Date(),
    };

    this.blogService.addPostOptimistically(blogData, token);
    this.router.navigate(['/blog/blogs-list']);
  }

  isInvalid(controlName: string): boolean {
    const control = this.blogForm.get(controlName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }
}
