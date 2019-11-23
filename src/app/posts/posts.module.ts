import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { PostCreateComponent } from "./post-create/post-create.component";
import { PostListComponent } from "./post-list/post-list.component";
import { AngularMaterialModule } from "../angular-material.module";

@NgModule({
  declarations: [PostCreateComponent, PostListComponent],
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class PostsModule {}
