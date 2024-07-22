import {Component, OnInit, WritableSignal} from '@angular/core';
import {EmployeeFormComponent} from "../employee-form/employee-form.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {Employee} from "../employee/employee";
import {EmployeeService} from "../employee/employee.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [
    EmployeeFormComponent,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Edit an Employee</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-employee-form>
          [initialState]="employee()"
          (formSubmitted)="editEmployee($event)"
        </app-employee-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``
})
export class EditEmployeeComponent implements OnInit {
  employee = {} as WritableSignal<Employee>;

  constructor (
      private router: Router,
      private route: ActivatedRoute,
      private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.employeeService.getEmployee(id!);
    this.employee = this.employeeService.employee$;
  }

  editEmployee (employee: Employee) {
    this.employeeService
        .updateEmployee(this.employee()._id || '', employee)
        .subscribe({
          next: () => {
            this.router.navigate(['/'])
          },
          error: (error) => {
            alert('Failed to update employee');
            console.error(error);
          }
        });
  }


}
