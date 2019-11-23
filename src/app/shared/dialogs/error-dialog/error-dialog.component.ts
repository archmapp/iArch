import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-error-dialog",
  templateUrl: "./error-dialog.component.html",
  styleUrls: ["./error-dialog.component.css"]
})
export class ErrorDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  // data => error-dialog.component.html
  // use the MAT_DIALOG_DATA injection token to enable data acceptance from other components.

  ngOnInit() {}

  public closeDialog = () => {
    this.dialogRef.close();
  };
}
