import { Component, OnInit } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import {
  NgbDateAdapter,
  NgbDateStruct,
  NgbDateNativeAdapter,
  NgbDate,
  NgbCalendar,
  NgbDateParserFormatter
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-ngb",
  templateUrl: "./ngb.component.html",
  styleUrls: ["./ngb.component.css"]
  // providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class NgbComponent implements OnInit {
  closeResult: number | string; // 日数
  model1;
  model2;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  getDiff(model1, model2) {
    if ( !(model1 && model2) ) {
      return '';
    }
      const days: any =
        new Date(model2.year, model2.month - 1, model2.day).getTime() -
        new Date(model1.year, model1.month - 1, model1.day).getTime();
    return days / 86400000;
  }

  open(content) {
    this.modalService
      .open(content, {
        ariaLabelledBy: "modal-basic-title",
        size: "sm"
        // windowClass: "dark-gray"
      })
      .result.then(
        result => {
          console.log(`=== Closed with: ${result}`);
          this.closeResult = `${this.getDiff(this.model1, this.model2)}`;
          // this.closeResult = `Closed with: ${result}: ${JSON.stringify(
          //   this.model1)
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      console.log("by pressing ESC");
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      console.log("by clicking on a backdrop");
      return "by clicking on a backdrop";
    } else {
      console.log(`with: ${reason}`);
      return `with: ${reason}`;
    }
  }
}
