import { NgModule } from "@angular/core";
import { AngularMaterialModule } from "../angular-material.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";

import { PostsComponent } from "./posts/posts.component";
import { UsersComponent } from "./users/users.component";
import { DbRoutingModule } from "./db-routing.module";

@NgModule({
  declarations: [PostsComponent, UsersComponent],
  imports: [NgbModule, AngularMaterialModule, FormsModule, DbRoutingModule]
})
export class DbModule {}
