import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { Subject } from "rxjs";
import { FlashMessagesService } from "angular2-flash-messages";

import { environment } from "../../environments/environment";
import { User } from "./auth-data.model";

const BACKEND_URL = environment.apiUrl + "/user/";

@Injectable({ providedIn: "root" })
export class AuthService {
  private users: User[] = [];
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private userName: string;
  private authStatusListener = new BehaviorSubject<boolean>(false);
  private usersUpdated = new Subject<{ users: User[] }>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  getUserName() {
    return this.userName;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(name: string, password: string, pref: string) {
    console.log("TCL: BACKEND_URL", BACKEND_URL);
    this.http
      .post(BACKEND_URL + "/signup", { name, password, pref })
      .subscribe(
        () => {
          this.router.navigate(["/"]);
          this.flashMessage.show("登録完了！　ログインしてご利用ください。", {
            cssClass: "alert-success text-center", // cssClass: "alert-success", "alert-danger"
            timeout: 4000
          });
        },
        error => {
          this.authStatusListener.next(false);
        }
      );
  }

  login(name: string, password: string) {
    this.http
      .post<{
        token: string;
        expiresIn: number;
        userName: string;
        userId: string;
      }>(BACKEND_URL + "/login", { name, password })
      .subscribe(
        response => {
          this.token = response.token;
          if (this.token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.userId = response.userId;
            this.userName = response.userName;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            this.saveAuthData(
              this.token,
              expirationDate,
              this.userId,
              this.userName
            );
            this.router.navigate(["/"]);
          }
        },
        error => {
          this.authStatusListener.next(false);
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.userId = authInformation.userId;
      this.userName = authInformation.userName;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.authStatusListener.next(false);
    this.userId = null;
    this.userName = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, userName: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", userName);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      userName: userName
    };
  }
  ///

  getUser(_id: string) {
    return this.http.get<User>(BACKEND_URL + _id);
  }

  deleteUser(userId: string) {
    return this.http.delete(BACKEND_URL + userId);
  }

  ///

  getUsers() {
    this.http
      .get<{ message: string; users: any; maxUsers: number }>(BACKEND_URL)
      .subscribe(data => {
        console.log("TCL: AuthService -> getUsers -> data", data);
        this.users = data.users;
        this.usersUpdated.next({
          users: [...this.users]
        });
      });
  }

  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
  }
}
