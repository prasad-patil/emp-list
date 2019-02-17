import { Employee } from './../models/employee';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private _http: HttpClient) {}

  get(): Observable<Employee[]> {
    return this._http.get<any[]>('http://localhost:3000/employees/').pipe(
      map((data: any[]) => {
        return data.map(value => {
          value.pickUpDate = new Date(value.pickUpDate);
          value.deliveryDate = new Date(value.deliveryDate);
          return value;
        });
      })
    );
  }
}
