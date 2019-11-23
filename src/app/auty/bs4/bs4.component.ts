import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: "app-bs4",
  templateUrl: "./bs4.component.html",
  styleUrls: ["./bs4.component.css"]
})
export class Bs4Component implements OnInit {
  constructor(private location: Location) {}

  ngOnInit() {}

  back() {
    this.location.back();
  }
}
