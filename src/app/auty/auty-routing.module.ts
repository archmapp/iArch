import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { Bs4Component } from "./bs4/bs4.component";
import { Bs4NComponent } from "./bs4-n/bs4-n.component";
import { NgbComponent } from './ngb/ngb.component';

const routes: Routes = [
  { path: "bs4", component: Bs4Component },
  { path: "bs4N", component: Bs4NComponent },
  { path: "ngb", component: NgbComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: []
})
export class AutyRoutingModule {}
