import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatTableModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatInputModule,
  MatSortModule,
  MatCheckboxModule,
  MatIconModule,
  MatToolbarModule,
  MatMenuModule,
  MatButtonModule,
  MatSelectModule,
  MatRadioModule,
  MatChipsModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatChipsModule
  ],
  exports: [
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatChipsModule
  ]
})
export class CustomMatModuleModule {}
