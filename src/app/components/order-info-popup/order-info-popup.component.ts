import { EmployeeListComponent } from './../employee-list/employee-list.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-order-info-popup',
  templateUrl: './order-info-popup.component.html',
  styleUrls: ['./order-info-popup.component.scss']
})
export class OrderInfoPopupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<OrderInfoPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
