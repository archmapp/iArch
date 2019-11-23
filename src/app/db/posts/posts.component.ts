import { Component, OnInit, OnDestroy } from "@angular/core";

import { Post } from "../../posts/post.model";
import { PostsService } from "../../posts/posts.service";
import { AuthService } from "../../auth/auth.service";
import { Subscription } from "rxjs/internal/Subscription";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"]
})
export class PostsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    "_id",
    "title",
    "content",
    "kouji",
    "kouki",
    "creator"
  ];

  ELEMENT_DATA = [
    {
      _id: "1",
      title: "First Post",
      content: "This is the first post's content"
    },
    {
      _id: "2",
      title: "Second Post",
      content: "This is the second post's content"
    },
    {
      _id: "3",
      title: "Third Post",
      content: "This is the third post's content"
    }
  ];
  posts: Post[] = [];
  totalPosts = 0;
  postsPerPage = 50;
  currentPage = 0;
  pageSizeOptions = [1, 2, 5, 50];
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
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authenticated => {
        this.userId = authenticated ? this.authService.getUserId() : null;
      });
  }

  onDeleteById(id) {
    console.log(id.value);
    this.postsService.deletePost(id.value).subscribe(
      () => {
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
      },
      () => {}
    );
  }

  onDeleteAll() {
    this.posts = [];
  }

  onReset() {
    this.posts = [...this.ELEMENT_DATA];
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
