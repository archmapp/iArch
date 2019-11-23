import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Location } from "@angular/common";

import { PostsService } from "../posts.service";
import { Post } from "../post.model";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  post: Post = this.postsService.setNull();
  private postId = "";

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.has("postId")) {
        this.postId = params.get("postId");
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.post = postData;
        });
      }
    },
    error => {
      console.log("this.route.paramMap.subscribe エラー");
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (!this.postId) {
      this.postsService.addPost(
        form.value.title,
        form.value.content,
        form.value.kouji,
        form.value.kouki
      );
    } else {
      // console.log(this.postId);
      this.postsService.updatePost(
        this.postId,
        form.value.title,
        form.value.content,
        form.value.kouji,
        form.value.kouki
      );
    }
    form.resetForm();
  }

  back() {
    this.location.back();
  }
}
