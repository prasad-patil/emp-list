import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatTableModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatInputModule,
  MatSortModule,
  MatCheckboxModule,
  MatIconModule
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
    MatIconModule
  ],
  exports: [
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule
  ]
})
export class CustomMatModuleModule {}
