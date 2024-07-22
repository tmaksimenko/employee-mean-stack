import { Component } from '@angular/core';
import {EmployeeFormComponent} from "../employee-form/employee-form.component";
import {MatCardModule} from "@angular/material/card";
import {Router} from "@angular/router";
import {EmployeeService} from "../employee/employee.service";
import {Employee} from "../employee/employee";

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [EmployeeFormComponent, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Add a New Employee</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-employee-form
            (formSubmitted)="addEmployee($event)">
        </app-employee-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``
})
export class AddEmployeeComponent {
  constructor (private router: Router, private employeeService: EmployeeService) {}

  addEmployee (employee: Employee) {
    this.employeeService.createEmployee(employee).subscribe({
      next: () => {
        this.router.navigate(['/'])
      },
      error: (error) => {
        alert('Failed to create employee');
        console.error(error);
      }
    });
    this.employeeService.getEmployees();
  }

}
