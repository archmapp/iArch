import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild("unameInput", { static: false }) unameInput: ElementRef;
  // @ViewChild("passwordInput", { static: false }) passwordInput: ElementRef;

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => this.unameInput.nativeElement.focus(), 0);
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.uname, form.value.password);
  }
}
