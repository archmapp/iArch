import { Component, OnInit, OnDestroy } from "@angular/core";

import { User } from "../../auth/auth-data.model";
import { AuthService } from "../../auth/auth.service";
import { Subscription } from "rxjs/internal/Subscription";

let users_DATA = [
  {
    email: "ty7575au@yahoo.co.jp",
    name: "ty7575au",
    password: "ty7575aa",
    pref: "福岡県",
    date: new Date()
  },
  {
    email: "archmapp@i.softbank.jp",
    name: "archmapp",
    password: "ty7575aa",
    pref: "福岡県",
    date: new Date()
  },
  {
    email: "tharch77@gmail.com",
    name: "tharch77",
    password: "ty7575aa",
    pref: "福岡県",
    date: new Date()
  },
  {
    email: "test@test.com",
    name: "test",
    password: "ttest",
    pref: "北海道",
    date: new Date()
  },
  {
    email: "test@gmail.com",
    name: "ttest",
    password: "ttest",
    pref: "北海道",
    date: new Date()
  }
];

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ["_id", "email", "name", "date"];
  // users: User[] = users_DATA;
  users: User[] = [];
  totalUsers = 0;
  postsPerPage = 50;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 50];
  userId: string;
  private usersSub: Subscription;
  private authStatusSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUsers();
    this.userId = this.authService.getUserId();
    this.usersSub = this.authService
      .getUserUpdateListener()
      .subscribe((postData: { users: User[] }) => {
        this.users = postData.users;
      });
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authenticated => {
        this.userId = authenticated ? this.authService.getUserId() : null;
      });
  }

  onDeleteById(id) {
    console.log(id.value);
    this.authService.deleteUser(id.value).subscribe(
      () => {
        this.authService.getUsers();
      },
      () => {}
    );
  }

  onDeleteAll() {
    this.users = [];
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
