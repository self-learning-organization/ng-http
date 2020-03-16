import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData.title, postData.content)
    .subscribe(() => {
      this.onFetchPosts(); // This is just one way to automate the refresh after adding a new post
    });
  }

  /* Alternative, coulda used mergeMap inside the service 
  createAndStorePost(title: string, content: string) {
    return this.http.post<{name: string}>('https://xxxxx.firebaseio.com/posts.json', {title, content}).pipe(mergeMap(() => this.fetchPosts()));
  }
 
  And replace the corresponding method with the following:
  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData.title, postData.content).subscribe(
      posts => this.loadedPosts = posts,
      error => this.error = error.statusText
    );
  }
  */

  onFetchPosts() {
    this.fetchPosts();
  }

  private fetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error => {
        this.error = error.message;
        console.log(error);
      }
    );
  }

  onClearPosts() {
    this.postsService.deletePosts()
    .subscribe(() => {
      this.loadedPosts = [];
    });
  }
}
