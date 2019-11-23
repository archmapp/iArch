import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { NgModule, LOCALE_ID } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import localeJa from "@angular/common/locales/ja";
import { registerLocaleData } from "@angular/common";
// import { MatPaginatorIntl } from "@angular/material";
import { MatPaginatorIntl } from "@angular/material";

import { FlexLayoutModule } from "@angular/flex-layout";
import { AngularMaterialModule } from "./angular-material.module";
import { LayoutComponent } from "./layout/layout.component";

import { FlashMessagesModule } from "angular2-flash-messages";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from "./app-routing.module";
import { AuthInterceptor } from "./auth/auth-interceptor";
import { ErrorInterceptor } from "./error-interceptor";
import { ErrorComponent } from "./error/error.component";
import { PostsModule } from "./posts/posts.module";
import { AutyModule } from "./auty/auty.module";
import { SidenavListComponent } from "./sidenav-list/sidenav-list.component";
import { SharedModule } from "./shared/shared.module";
import { MatPaginatorIntlJa } from "./mat-paginator-intl-ja";
registerLocaleData(localeJa);

@NgModule({
  declarations: [
    AppComponent,
    SidenavListComponent,
    HeaderComponent,
    ErrorComponent,
    LayoutComponent,
  ],
  imports: [
    FormsModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    FlashMessagesModule.forRoot(),
    AngularMaterialModule,
    SharedModule,
    PostsModule,
    AutyModule
  ],
  exports: [],
  providers: [
    { provide: LOCALE_ID, useValue: "ja-JP" },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlJa }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule {}
