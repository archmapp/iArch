import { Component, OnInit } from "@angular/core";

import {
  NgbDateAdapter,
  NgbDateStruct,
  NgbDateNativeAdapter,
  NgbDate,
  NgbCalendar,
  NgbDateParserFormatter
} from "@ng-bootstrap/ng-bootstrap";

import { Location } from "@angular/common";

@Component({
  selector: "app-bs4-n",
  templateUrl: "./bs4-n.component.html",
  styleUrls: ["./bs4-n.component.css"],
  // NOTE: For this example we are only providing current component, but probably
  // NOTE: you will want to provide your main App Module
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class Bs4NComponent implements OnInit {
  currentRate = 6;
  model;
  model1: Date;
  model2: Date;

  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;

  constructor(
    private location: Location,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), "d", 10);
  }

  ngOnInit() {}

  get today() {
    return new Date();
  }

  back() {
    this.location.back();
  }

  // Range selection in a popup

  // hoveredDate: NgbDate;

  // fromDate: NgbDate;
  // toDate: NgbDate;

  // constructor(
  //   private calendar: NgbCalendar,
  //   public formatter: NgbDateParserFormatter
  // ) {
  //   this.fromDate = calendar.getToday();
  //   this.toDate = calendar.getNext(calendar.getToday(), "d", 10);
  // }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      date.equals(this.toDate) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate, input: string): NgbDate {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }
}
