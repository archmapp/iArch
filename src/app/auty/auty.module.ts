import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";

import { AutyRoutingModule } from './auty-routing.module';
import { TableBasicComponent } from "./ng-bs/table-basic/table-basic.component";
import {
  TableSortableComponent,
  NgbdSortableHeader
} from "./ng-bs/table-sortable/table-sortable.component";

import { Bs4Component } from "./bs4/bs4.component";
import { Bs4NComponent } from "./bs4-n/bs4-n.component";
import { NgbComponent } from "./ngb/ngb.component";


@NgModule({
  declarations: [
    Bs4Component,
    Bs4NComponent,
    NgbComponent,
    TableBasicComponent,
    TableSortableComponent,
    NgbdSortableHeader
  ],
  imports: [CommonModule, FormsModule, AutyRoutingModule, NgbModule]
})
export class AutyModule {}
