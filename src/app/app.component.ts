import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
    this.fetchPosts();
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData.title, postData.content)
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
        this.isFetching = false;
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

  onHandleError() {
    this.error = null;
  }
}
