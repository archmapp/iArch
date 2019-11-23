import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { FlashMessagesService } from "angular2-flash-messages";

import { AuthService } from "../auth.service";
import { Pref } from "../pref";

@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("unameInput", { static: false }) unameInput: ElementRef;
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(
    public authService: AuthService,
    private flashMessage: FlashMessagesService
  ) {}

  prefs: Pref[] = [
    { viewValue: "北海道", value: "北海道" },
    { viewValue: "青森県", value: "青森県" },
    { viewValue: "岩手県", value: "岩手県" },
    { viewValue: "宮城県", value: "宮城県" },
    { viewValue: "秋田県", value: "秋田県" },
    { viewValue: "山形県", value: "山形県" },
    { viewValue: "福島県", value: "福島県" },
    { viewValue: "茨城県", value: "茨城県" },
    { viewValue: "栃木県", value: "栃木県" },
    { viewValue: "群馬県", value: "群馬県" },
    { viewValue: "埼玉県", value: "埼玉県" },
    { viewValue: "千葉県", value: "千葉県" },
    { viewValue: "東京都", value: "東京都" },
    { viewValue: "神奈川県", value: "神奈川県" },
    { viewValue: "新潟県", value: "新潟県" },
    { viewValue: "富山県", value: "富山県" },
    { viewValue: "石川県", value: "石川県" },
    { viewValue: "福井県", value: "福井県" },
    { viewValue: "山梨県", value: "山梨県" },
    { viewValue: "長野県", value: "長野県" },
    { viewValue: "岐阜県", value: "岐阜県" },
    { viewValue: "静岡県", value: "静岡県" },
    { viewValue: "愛知県", value: "愛知県" },
    { viewValue: "三重県", value: "三重県" },
    { viewValue: "滋賀県", value: "滋賀県" },
    { viewValue: "京都府", value: "京都府" },
    { viewValue: "大阪府", value: "大阪府" },
    { viewValue: "兵庫県", value: "兵庫県" },
    { viewValue: "奈良県", value: "奈良県" },
    { viewValue: "和歌山県", value: "和歌山県" },
    { viewValue: "鳥取県", value: "鳥取県" },
    { viewValue: "島根県", value: "島根県" },
    { viewValue: "岡山県", value: "岡山県" },
    { viewValue: "広島県", value: "広島県" },
    { viewValue: "山口県", value: "山口県" },
    { viewValue: "徳島県", value: "徳島県" },
    { viewValue: "香川県", value: "香川県" },
    { viewValue: "愛媛県", value: "愛媛県" },
    { viewValue: "高知県", value: "高知県" },
    { viewValue: "福岡県", value: "福岡県" },
    { viewValue: "佐賀県", value: "佐賀県" },
    { viewValue: "長崎県", value: "長崎県" },
    { viewValue: "熊本県", value: "熊本県" },
    { viewValue: "大分県", value: "大分県" },
    { viewValue: "宮崎県", value: "宮崎県" },
    { viewValue: "鹿児島県", value: "鹿児島県" },
    { viewValue: "沖縄県", value: "沖縄県" }
  ];

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
  }

  ngAfterViewInit() {
    setTimeout(() => this.unameInput.nativeElement.focus(), 0);
  }

  onSignup(form: NgForm) {
    console.log("TCL: SignupComponent -> onSignup -> form", form.value);
    if (form.invalid) {
      return;
    }
    if (form.value.uname.trim().length < 2) {
      this.flashMessage.show("2文字以上の有効なユーザー名を入力してください", {
        cssClass: "alert-danger text-center", // cssClass: "alert-success", "alert-danger"
        timeout: 3000
      });
      return;
    }
    if (form.value.password.trim().length < 4) {
      this.flashMessage.show(
        "4文字以上の有効なパスワードを入力してください（前後の空白も除く）",
        {
          cssClass: "alert-danger text-center", // cssClass: "alert-success", "alert-danger"
          timeout: 3000
        }
      );
      return;
    }
    // this.isLoading = true;
    this.authService.createUser(
      form.value.uname,
      form.value.password,
      form.value.pref
    );
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
