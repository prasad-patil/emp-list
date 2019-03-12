import { EmployeeService } from './../../services/employee.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee, Order } from 'src/app/models/employee';
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatIconRegistry,
  MatDialogRef,
  MatDialog,
  DialogPosition
} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { OrderInfoPopupComponent } from '../order-info-popup/order-info-popup.component';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', display: 'none' })
      ),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'info',
    'id',
    'uid',
    'istrusted',
    'orders',
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

  selection = new SelectionModel<Employee>(true, []);

  idFilter = new FormControl();
  uidFilter = new FormControl();
  hobbyFilter = new FormControl();

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

  hobbyList: Hobby[] = [
    { value: 'cricket', viewValue: 'Cricket' },
    { value: 'football', viewValue: 'Football' },
    { value: 'tennis', viewValue: 'Tennis' }
  ];

  orderTableColumns: string[] = ['fro', 'deliveryAddr', 'pickAddr'];
  orderTabledataSource: MatTableDataSource<Order>;
  expandedElement: any | null;

  constructor(
    private empService: EmployeeService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public dialog: MatDialog
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
    iconRegistry.addSvgIcon(
      'cancel',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/svgs/baseline-cancel-24px.svg'
      )
    );
    iconRegistry.addSvgIcon(
      'add',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/svgs/baseline-add_circle_outline-24px.svg'
      )
    );
    iconRegistry.addSvgIcon(
      'remove',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/svgs/baseline-remove_circle_outline-24px.svg'
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

    this.hobbyFilter.valueChanges.subscribe(hobbyFilterValue => {
      this.filteredValues['hobby'] = hobbyFilterValue || '';
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
  }

  customFilterPredicate() {
    const myFilterPredicate = (data: Employee, filter: string): boolean => {
      const searchString = JSON.parse(filter);
      return (
        (data.id || '')
          .toString()
          .trim()
          .indexOf(searchString.id) !== -1 &&
        (data.uid || '')
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString.uid) !== -1 &&
        data.hobby
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString.hobby) !== -1 &&
        filterDate(searchString.deliveryDate, data.deliveryDate)
      );
    };
    function filterDate(dateRange, dateToFilter) {
      if (dateRange === '') {
        return true;
      }

      const dates = dateRange.split(',');
      if (
        dateToFilter > new Date(dates[0]) &&
        dateToFilter < new Date(dates[1])
      ) {
        return true;
      }
      return false;
    }
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
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }
  onDeliveryDatePickerClosed(e) {
    const dateRange = `${this.deliveryFilterRange[0].toISOString()},${this.deliveryFilterRange[1].toISOString()}`;
    this.filteredValues['deliveryDate'] = dateRange;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }
  onDeliverydateFilterChanges(e) {
    if (
      this.deliveryFilterRange[0] === null ||
      this.deliveryFilterRange[1] === null
    ) {
      this.filteredValues['deliveryDate'] = '';
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    }
  }
  onDeliveryDateClear(e) {
    this.deliveryFilterRange[0] = null;
    this.deliveryFilterRange[1] = null;
    e.value = '';
    this.filteredValues['deliveryDate'] = '';
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }
  openDialog(event): void {
    const dialogPosition: DialogPosition = {
      right: '0'
    };

    const dialogRef = this.dialog.open(OrderInfoPopupComponent, {
      width: '350px',
      height: '100%',
      maxHeight: '100%',
      position: dialogPosition,
      panelClass: 'myapp-no-padding-dialog',
      disableClose: true,
      data: {
        fro: '123464'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  toggleExpandRow(row) {
    this.orderTabledataSource = new MatTableDataSource(row.orders);
  }
}

export interface Hobby {
  value: string;
  viewValue: string;
}
