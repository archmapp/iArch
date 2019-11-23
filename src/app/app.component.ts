import { Component, OnInit, AfterViewInit, } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";
// import { Subscription } from "rxjs";

import { AuthService } from "./auth/auth.service";
// import { ErrorService } from "./error/error.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, AfterViewInit {
  // hasError = false;
  // private errorSub: Subscription;

  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService // private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.authService.autoAuthUser();
    // this.errorSub = this.errorService.getErrorListener().subscribe(
    //   message => this.hasError = message !== null
    // );
    this.flashMessage.show("ようこそ、i入札（建築編）へ", {
      cssClass: "alert-success text-center", // cssClass: "alert-success", "alert-danger"
      timeout: 2000
    });
  }

  ngAfterViewInit() {
    // this.flashMessage.show("ようこそ、i入札（建築編）へ", {
    //   cssClass: "alert-success text-center", // cssClass: "alert-success", "alert-danger"
    //   timeout: 3000
    // });
  }

  // ngOnDestroy() {
  //   this.errorSub.unsubscribe();
  // }
}
