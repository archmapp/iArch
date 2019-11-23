独自に解析して、改造・改良して御社で利用することは自由ですが、著作権はアーキエムアップに残ります。


制約事項
ユーザー名・パスワードは、30文字以内です。

認証の継続時間は、1時間です。その時は再ログインをしてください。


https://qiita.com/kmatae/items/c612e1b2b22277d948d0
[task.json]
// nodemonを使うと、node.jsのプロセスが残ったままになります。
<!-- nodemonのデバッグが終わった時に、node.jsのプロセスを一掃する仕組み -->
taskkillコマンドで、node.exeのプロセスを全てkillする
taskkill /F /IM node.exe


https://mosapride.com/index.php/2018/04/12/post-774/
【Angular】VS Codeでデバック設定

https://qiita.com/kmatae/items/c612e1b2b22277d948d0
Node.jsとAngularのプロジェクトをvscodeでデバッグする



https://github.com/angular/flex-layout/wiki/API-Documentation
angular/flex-layout
  npm install @angular/flex-layout --save
      + @angular/flex-layout@8.0.0-beta.27

  [管理者権限で]
  npm install --save hammerjs
  

~~~~~~~~~~~~~~~~~~~~~~~~~~
node.jsアプリをWindows Service化 (winser)
~~~~~~~~~~~~~~~~~~~~~~~~~~
https://qiita.com/t-okushima/items/b99f9caae0c9b265d648
serviceの開始で使用されるスクリプトはデフォルトでstartになります。
また、service名称のデフォルトはpackage.jsonのnameになります。
{
  "name": "archmapp-iconstruct",
    ~ 省略 ~
    "scripts" : {
        "start" : "node app.js",
        "install-service" : "winser -i -a",
        "uninstall-service" : "winser -r -x"
    },
    ~ 省略 ~
}
サービス登録 (管理者権限のコマンドプロンプトから実行!)
package.jsonに追加したinstallスクリプトを実行
npm run install-service
 nssm64.exeが実行される。
 Winserというライブラリでは、内部でnssmというアプリを使用しています。
これは、任意のexeをサービスとして動作させるためのアプリです。

services.msc

===========================
nodemon.js
  {
    "env": {
      "MONGO_ATLAS_PW": "ty7575aa",
      "JWT_KEY": "secret_this_should_be_longer_auty"
    }
  }
  set MONGO_ATLAS_PW=ty7575aa
  set JWT_KEY=secret_this_should_be_longer_auty



===============================================================
サーバ(Nodejs)とAngularを一つのアプリとしてリモートサーバに設定する
===============================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~
AWS
~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~

AWS Elastic Beanstalk
~~~~~~~~~~~~~~~~~~~~~~~~~~
node-angular-Max1　iArch
~~~~~~~~~~~~~~~~~~~~~~~~~~
environment.prod.ts
  apiUrl: "https://still-dusk-91688.herokuapp.com/api"
  apiUrl: "http://nodeangularmax1-env.h7b8dyvcmm.us-east-2.elasticbeanstalk.com/" AWS Elastic Beanstalk
Created EIP: 18.189.123.16

Angularのコンパイルの出力先も、backend/以下に変更
max1_auty\[angular.json]
  "outputPath": "backend/angular",
ng build --prod

[[app.js]]の変更
  app.use("/", express.static(path.join(__dirname, "angular")));

  app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "angular", "index.html"));
  });

npm run start:server ( nodemon ./backend/server.js ) 
localhost:3000

ZIP


 http://nodeangular-env.2yynjrxeta.us-east-2.elasticbeanstalk.com/api/posts

platform: Node.js
  アップロード　[Max1App.zip]

ソフトウェアの変更
Node command: node server.js
[nodemon.json]
  {
    "env": {
      "MONGO_ATLAS_PW": "ty7575aa",
      "JWT_KEY": "secret_this_should_be_longer_auty"
    }
  }

[Angular]の準備
src\environments\environment.prod.ts
  export const environment = {
    production: true,
    apiUrl: "http://nodeangular-env.2yynjrxeta.us-east-2.elasticbeanstalk.com/api"
  };

ng build --prod



AWS s3
~~~~~~~~~~~~~~~~~~~~~~~~~~
 [Elastic Beanstalk]
 NodeAngular-env.2yynjrxeta.us-east-2.elasticbeanstalk.com
 http://nodeangular-env.2yynjrxeta.us-east-2.elasticbeanstalk.com/api/posts

platform: Node.js
  アップロード　[Max2App.zip]

ソフトウェアの変更
Node command: node server.js
[nodemon.json]
  {
    "env": {
      "MONGO_ATLAS_PW": "ty7575aa",
      "JWT_KEY": "secret_this_should_be_longer_auty"
    }
  }

[Angular]
ng build --prodを利用するために、
src\environments\[environment.prod.ts]
  export const environment = {
    production: true,
    apiUrl: "http://nodeangular-env.2yynjrxeta.us-east-2.elasticbeanstalk.com/api"
  };
[angular.json]
  "projects": {
    "mean-course": {
      "root": "",
      "sourceRoot": "src",
      ...
        "outputPath": "dist/mean-course",

ng build --prod

AWS s3
・create Bucket バケット名の入力
・upload
・
・Bucket Permissionsを構成
    ブロックパブリックアクセスの編集
    □　すべてオフ
・Bucket policyを追加
    (ドキュメントを参照・Bucket Policy Exampls・匿名ユーザー)
    バケット名を変更（[node-angular-2app]）
    {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AddPerm",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::[node-angular-2app]/*"
        }
      ]
    }

[プロパティ]
  [[Static website hosting]]
  ・このバケットを使用して、ウェブサイトをホストする
  [Endpoint] http://node-angular-2app.s3-website-ap-northeast-1.amazonaws.com
  index.html, 
  Error document: index.html
  
~~~~~~~~~~~~~~~~~~~~~~~~~~

==========
ページネーションを隠す。
  post-list.component.ts
      postsPerPage = 50 //  十分に大きくする
      currentPage = 1;
      pageSizeOptions = [1, 2, 5, 50];
  
  posts.js
    [const postQuery = Post.find();  // ページネーション用]
    let fetchedPosts;

    if (pageSize && currentPage) {
      postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    postQuery
      .then(documents => {
        fetchedPosts = documents;
        return [Post.count(); //  全件数]
        return [Post.countDocuments(); //  全件数]
  ---
  <mat-paginator [length]="totalPosts" [pageSize]="postsPerPage" [pageSizeOptions]="pageSizeOptions" (page)="onChangedPage($event)"
  *ngIf="false"></mat-paginator>
==========
==========
ng g c ng-Bs/table-basic --skip-tests --module=app.module.ts
ng g c ng-Bs/table-sortable --skip-tests --module=app.module.ts
==========





======
  jsFiddle
  https://www.youtube.com/watch?v=Tux1nhBPl_w&list=PL55RiY5tL51pHpagYcrN9ubNLVXF8rGVi&index=2
======


npm install --only=dev

C:\Users\Owner>ng --version
Angular CLI: 1.7.3
[失敗]　C:\Program Files\nodejs\に、ng, ng.cmdが残っていた。！
Node: 10.15.0
OS: win32 x64
Angular:
...

Angular CLI: 8.3.0
Node: 10.15.0
OS: win32 x64
Angular: 8.2.3
... animations, common, compiler, compiler-cli, core, forms
... language-service, platform-browser, platform-browser-dynamic
... router

Package                           Version
-----------------------------------------------------------
@angular-devkit/architect         0.800.6
@angular-devkit/build-angular     0.800.6
@angular-devkit/build-optimizer   0.800.6
@angular-devkit/build-webpack     0.800.6
@angular-devkit/core              8.0.6
@angular-devkit/schematics        8.3.0
@angular/cli                      8.3.0
@ngtools/webpack                  8.0.6
@schematics/angular               8.3.0
@schematics/update                0.803.0
rxjs                              6.5.2
typescript                        3.4.5
webpack                           4.30.0

==========

==========
https://qiita.com/Yamamoto0525/items/65d5a0b36eb4dbd8079b
// グローバル環境のアップデート
npm uninstall -g @angular/cli
npm cache clean   npm cache verify
 （node v5以上だと、npm cache clean ではなく npm cache verify）
npm install -g @angular/cli@latest

// ローカル環境のアップデート
rm -rf node_modules dist
npm install --save-dev @angular/cli@latest
npm install
==========
==========
https://www.techiediaries.com/updating-angular-cli-projects/
Updating Angular CLI to v8

Make sure you have the latest version of Node (12+) and npm installed in your system. 
==========

==========
MUST READ: Angular CLI - Latest Version
Important

In the next lecture, we will use a tool called the "Angular CLI" to create our Angular project.

With the latest version, this tool will ask you two questions:

1) Do you want to use the Angular Router?

2) Which CSS pre-processor do you want to use?

Simply hit ENTER twice and confirm the default (without entering any value).

The defaults (which we will use therefore) are:

1) No (No router for now, we'll add it later)

2) CSS

=========





# MeanCourse

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
