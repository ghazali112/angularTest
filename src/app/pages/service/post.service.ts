import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class PostService {
  private apiUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getPosts(page = 1) {
    return this.http.get(`${this.apiUrl}?page=${page}`);
  }

  getPostById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createPost(post: any) {
    const token = this.auth.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl, post, { headers });
  }
}
