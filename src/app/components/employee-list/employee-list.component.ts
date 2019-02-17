import { EmployeeService } from './../../services/employee.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatIconRegistry
} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'info',
    'id',
    'uid',
    'istrusted',
    'name',
    'lastName',
    'position',
    'office',
    'salary',
    'favColor',
    'city',
    'favBook',
    'pickUpDate',
    'deliveryDate',
    'hobby'
  ];

  selection = new SelectionModel<Employee[]>(true, []);

  idFilter = new FormControl();
  uidFilter = new FormControl();

  pickUpFilterRange: Date[];
  deliveryFilterRange: Date[];

  filteredValues = {
    id: '',
    uid: '',
    istrusted: '',
    name: '',
    lastName: '',
    position: '',
    office: '',
    salary: '',
    favColor: '',
    city: '',
    favBook: '',
    pickUpDate: '',
    deliveryDate: '',
    hobby: ''
  };

  dataSource: MatTableDataSource<Employee>;

  empList: Employee[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private empService: EmployeeService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'remove_red_eye',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/svgs/baseline-remove_red_eye-24px.svg'
      )
    );
    iconRegistry.addSvgIcon(
      'verified_user',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/svgs/baseline-verified_user-24px.svg'
      )
    );
    iconRegistry.addSvgIcon(
      'highlight_off',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/svgs/baseline-highlight_off-24px.svg'
      )
    );
    iconRegistry.addSvgIcon(
      'search',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/svgs/baseline-search-24px.svg'
      )
    );
  }

  ngOnInit() {
    this.empService.get().subscribe(data => {
      this.empList = data;
      this.dataSource = new MatTableDataSource(this.empList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.customFilterPredicate();

      console.log(this.empList);
    });
    this.idFilter.valueChanges.subscribe(idFilterValue => {
      this.filteredValues['id'] = idFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.uidFilter.valueChanges.subscribe(nameFilterValue => {
      this.filteredValues['uid'] = nameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
  }

  customFilterPredicate() {
    const myFilterPredicate = (data: Employee, filter: string): boolean => {
      const searchString = JSON.parse(filter);
      return (
        data.id
          .toString()
          .trim()
          .indexOf(searchString.id) !== -1 &&
        data.uid
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString.uid) !== -1
      );
    };
    return myFilterPredicate;
  }

  applyFilter(filter) {
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    // this.isAllSelected()
    //   ? this.selection.clear()
    //   : this.dataSource.data.forEach((row) =>
    //       this.selection.select(row)
    //     );
  }
}
