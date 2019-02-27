import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-assign-transporter',
  templateUrl: './assign-transporter.component.html',
  styleUrls: ['./assign-transporter.component.scss']
})
export class AssignTransporterComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource: MatTableDataSource<PeriodicElement>;
  selection = new SelectionModel<PeriodicElement>(true, []);

  data = [
    1212454,
    1212454,
    1212454,
    1212113,
    1212454,
    1212454,
    1212454,
    1212454,
    1212454,
    1212454,
    1212454,
    1212454,
    1212454,
    1321231,
    1321231,
    1321231,
    1321231,
    1321231,
    1321231,
    1321231,
    1321231,
    2123121,
    1321231
  ];

  showAllChips = false;
  constructor() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  onSelection(e, row) {
    e.stopPropagation();
    this.selection.clear();
    this.selection.select(row);
  }

  getOrderIds() {
    if (!this.showAllChips) {
      return this.data.slice(0, 6);
    }
    return this.data;
  }
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
];

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
