import { Component, OnInit, OnDestroy } from "@angular/core";
import { PageEvent } from "@angular/material";
import { Subscription } from "rxjs";

import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  totalPosts = 0;
  postsPerPage = 10000;
  // postsPerPage = 5;
  currentPage = 0;
  pageSizeOptions = [1, 2, 5, 70];
  userId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public postsService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Post[]; postCount: number }) => {
      // console.log("TCL: PostListComponent -> ngOnInit -> postData", postData)
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authenticated => {
        this.userId = authenticated ? this.authService.getUserId() : null;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex; // BACKEND: start from 0 also
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId).subscribe(
      () => {
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
      },
      () => {
      }
    );
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
