import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { toastService } from './toast.service';

export interface BlogPost {
    id: string;
    title: string;
    content: string;
    author: string;
    createdAt: Date;
    optimistic?: boolean;
}

@Injectable({ providedIn: 'root' })
export class BlogService {
    private postsSubject = new BehaviorSubject<BlogPost[]>([]);
    posts$ = this.postsSubject.asObservable();

    constructor(private http: HttpClient, private router: Router,private toastService:toastService) { }

    getPosts() {
        this.http.get<BlogPost[]>('http://localhost:3000/posts').subscribe({
            next: (posts: any) => {
                this.postsSubject.next(posts.data);
            },
            error: (err) => {
                console.error('Failed to fetch posts', err);
                this.postsSubject.next([]); // fallback to empty
            }
        });
    }

    addPostOptimistically(post: BlogPost, token: string) {
        const tempPost: BlogPost = {
            ...post,
            id: uuidv4(),
            createdAt: new Date(),
            optimistic: true
        };

        const currentPosts = Array.isArray(this.postsSubject.value) ? this.postsSubject.value : [];
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
                      this.postsSubject.next([tempPost, ...currentPosts]);
        this.http.post<BlogPost>('http://localhost:3000/posts', post, { headers }).subscribe({
            next: (realPost) => {
                const updated = this.postsSubject.value.map(p =>
                    p.id === tempPost.id ? { ...realPost, optimistic: false } : p
                );
                        this.toastService.showToast('success', 'Success', 'Blog has been uploaded');

                this.postsSubject.next(updated);
            },
            error: (err) => {
                console.error('Failed to create post', err);
                // Roll back the optimistic update
                const rolledBack = this.postsSubject.value.filter(p => p.id !== tempPost.id);
                this.postsSubject.next(rolledBack);

                // Check for token expiration or invalid token
                if (err.status === 401 || err.status === 403) {
                    // Navigate to login page
                    this.router.navigate(['/auth/login']); // Adjust route if needed
                          this.toastService.showToast('error', 'Error', 'Your session has been expired');
                }
            }
        });
    }

}
