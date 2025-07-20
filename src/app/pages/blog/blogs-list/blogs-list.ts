import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonModule } from 'primeng/button';
import { AppTopbar } from '../../../layout/component/top-bar/app.topbar';
import { BlogService } from '../../service/blog.service';
import { createBlog } from '../create-blog/create-blog';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-blogs-list',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    AgGridModule,
    PaginatorModule,
    ButtonModule,
    AppTopbar,
    createBlog,
    DialogModule
  ],
  templateUrl: './blogs-list.html',
})
export class blogsList implements OnInit {
  allPosts: any[] = []; // Store all posts
  posts: any[] = [];    // Current page data for the grid
  totalPosts = 0;
  pageSize = 5;
  displayModal: boolean = false;

  columnDefs = [
    { headerName: 'Title', field: 'title', flex: 1 },
    {
      headerName: 'Excerpt',
      field: 'content',
      flex: 2,
      valueFormatter: this.excerptFormatter
    },
    { headerName: 'Author', field: 'author', flex: 1 },
    {
      headerName: 'Published Date',
      field: 'createdAt',
      flex: 1,
      valueFormatter: this.dateFormatter
    }
  ];

  defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true
  };

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit() {
   this.blogService.getPosts();
  this.blogService.posts$.subscribe(posts => {
    // Sort posts by createdAt DESC (newest first)
    this.allPosts = posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    this.totalPosts = this.allPosts.length;
    this.fetchPosts(1); // Show first page
    this.displayModal=false;
  });
  }

  fetchPosts(page: number) {
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.posts = this.allPosts.slice(start, end);
  }

  onPageChange(event: any) {
    this.pageSize = event.rows;
    const page = event.page + 1; // PrimeNG pages start from 0
    this.fetchPosts(page);
  }

  excerptFormatter(params: any) {
    return params.value?.substring(0, 60) + '...';
  }

  dateFormatter(params: any) {
    return new Date(params.value).toLocaleDateString();
  }

  goToCreatePost() {
    this.displayModal = true;
  }

  onRowClicked(event: any) {
    this.router.navigate(['blog/blog-detail', event.data]);
  }
}
