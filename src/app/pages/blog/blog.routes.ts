import { Routes } from '@angular/router';
import { blogsList } from './blogs-list/blogs-list';
import { createBlog } from './create-blog/create-blog';
import { blogDetail } from './blog-detail/blog-detail';



export default [
    {  path: '', component: blogsList},
    { path: 'blogs-list', component: blogsList },
     { path: 'blogs-create', component: createBlog },
      { path: 'blog-detail', component: blogDetail },
] as Routes;
