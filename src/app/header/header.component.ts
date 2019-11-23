import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from "@angular/core";
import { Subscription } from "rxjs";

import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  userId: string = null;
  userName: string = null;

  @Output() public sidenavToggle = new EventEmitter();

  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(authenticated => {
        this.userId = authenticated ? this.authService.getUserId() : null;
        this.userName = authenticated ? this.authService.getUserName() : null;
      });
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
