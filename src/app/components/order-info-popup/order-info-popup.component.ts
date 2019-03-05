import { EmployeeListComponent } from './../employee-list/employee-list.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-order-info-popup',
  templateUrl: './order-info-popup.component.html',
  styleUrls: ['./order-info-popup.component.scss']
})
export class OrderInfoPopupComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<OrderInfoPopupComponent>) {}

  ngOnInit() {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
