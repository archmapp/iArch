import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AngularMaterialModule } from "../angular-material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SuccessDialogComponent } from "./dialogs/success-dialog/success-dialog.component";
import { ErrorDialogComponent } from "./dialogs/error-dialog/error-dialog.component";

@NgModule({
  declarations: [
    SuccessDialogComponent,
    ErrorDialogComponent,

  ],

  imports: [CommonModule, AngularMaterialModule, FlexLayoutModule],
  exports: [
    AngularMaterialModule,
    FlexLayoutModule,
    SuccessDialogComponent, // need to export
    ErrorDialogComponent
  ],
  // need to place the dialog components inside the entryComponents array
  entryComponents: [SuccessDialogComponent, ErrorDialogComponent]
})
export class SharedModule {}
