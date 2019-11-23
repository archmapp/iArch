import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PostsComponent } from "./posts/posts.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
  { path: "posts", component: PostsComponent },
  { path: "users", component: UsersComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DbRoutingModule {}
