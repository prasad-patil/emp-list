import { CustomMatModuleModule } from './custom-mat-module/custom-mat-module.module';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { EmployeeService } from './services/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { AssignTransporterComponent } from './components/assign-transporter/assign-transporter.component';
import { OrderInfoPopupComponent } from './components/order-info-popup/order-info-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    SideNavbarComponent,
    AssignTransporterComponent,
    OrderInfoPopupComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CustomMatModuleModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgScrollbarModule
  ],
  entryComponents: [OrderInfoPopupComponent],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
