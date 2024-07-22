import {Injectable, signal} from '@angular/core';
import {Employee} from "./employee";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = 'http://localhost:3000';
  employees$ = signal<Employee[]>([]);
  employee$ = signal<Employee>({} as Employee);

  constructor(private http: HttpClient) { }

  private refreshEmployees () {
    this.http.get<Employee[]>(`${this.url}/employees`)
        .subscribe(employees => {
          this.employees$.set(employees);
        });
  }

  getEmployees () {
    this.refreshEmployees();
    return this.employees$;
  }

  getEmployee (id: string) {
    this.http.get<Employee>(`${this.url}/employees/${id}`)
        .subscribe(employee => {
          this.employee$.set(employee);
          return this.employee$;
        });
  }

  createEmployee (employee: Employee) {
    return this.http.post(`${this.url}/employees`, employee, {responseType: "text"});
  }

  updateEmployee (id: string, employee: Employee) {
    return this.http.put(`${this.url}/employees/${id}`, employee, {responseType: "text"});
  }

  deleteEmployee (id: string) {
    return this.http.delete(`${this.url}/employees/${id}`, {responseType: "text"});
  }

}
