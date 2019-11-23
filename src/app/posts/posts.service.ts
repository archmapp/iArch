import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";
import { Post } from "./post.model";

const BACKEND_URL = environment.apiUrl + "/posts/";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    // console.log("TCL: PostsService -> getPosts -> pagesize", postsPerPage);
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        BACKEND_URL + queryParams
      )
      // .pipe(
      //   map(postData => {
      //     return {
      //       // messageは利用されていない。
      //       posts: postData.posts.map(post => {
      //         return post;
      //       }),
      //       maxPosts: postData.maxPosts
      //     };
      //   })
      // )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        // console.log("TCL: PostsService -> getPosts -> this.posts", this.posts)
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(_id: string) {
    return this.http.get<Post>(BACKEND_URL + _id);
  }

  addPost(title: string, content: string, kouji: string, kouki: string) {
    this.http
      .post<Post>(BACKEND_URL, { title, content, kouji, kouki })
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  updatePost(_id, title, content, kouji: string, kouki: string) {
    this.http
      .put(BACKEND_URL + _id, {
        _id,
        title,
        content,
        kouji,
        kouki
      })
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }

  // updatePost(_id, title, content, kouji: string, kouki: string) {
  //   this.http
  //     .put(BACKEND_URL + _id, {
  //       _id,
  //       title,
  //       content,
  //       kouji,
  //       kouki
  //     })
  //     .subscribe(response => {
  //       this.router.navigate(["/"]);
  //     });
  // }

  deletePost(postId: string) {
    return this.http.delete(BACKEND_URL + postId);
  }

  setNull() {
    return {
      _id: "",
      title: "",
      content: "",
      creator: "",
      kouji: "",
      kouki: ""
    };
  }
}
