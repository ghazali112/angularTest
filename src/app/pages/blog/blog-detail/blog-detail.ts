import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { AppTopbar } from '../../../layout/component/top-bar/app.topbar';

@Component({
    selector: 'app-blog-detail',
    standalone: true,
    imports: [CommonModule, CardModule, DividerModule,ButtonModule,AppTopbar],
    templateUrl: './blog-detail.html',
})
export class blogDetail {
 blog: any;

  constructor(private route: ActivatedRoute, private http: HttpClient,public router:Router) {}

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('id');
    this.http.get<any>(`http://localhost:3000/posts/${postId}`).subscribe(res => {
      this.blog = res;
    });
  }

   goBack() {
    this.router.navigate(['blog/blogs-list']);
  }
}