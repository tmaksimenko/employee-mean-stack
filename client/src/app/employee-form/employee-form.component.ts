import {Component, effect, EventEmitter, input, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {Employee} from "../employee/employee";
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatRadioGroup,
    MatRadioButton,
    RouterLink,
    MatError,
    MatButton
  ],
  template: `
    <form
      class="flex flex-col items-start p-8"
      autocomplete="off"
      [formGroup]="employeeForm"
      (submit)="submitForm()"
    >
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput placeholder="Name" formControlName="name" required />
        @if (name.invalid) {
          <mat-error>Name must be at least 2 characters long.</mat-error>
        }
      </mat-form-field>
  
      <mat-form-field>
        <mat-label>Position</mat-label>
        <input matInput placeholder="Position" formControlName="position" required />
        @if (position.invalid) {
          <mat-error>Position must be at least 5 characters</mat-error>
        }
      </mat-form-field>
        
      <mat-radio-group formControlName="level" aria-label="Select an option">
        <mat-radio-button name="level" value="junior" required
            >Junior
        </mat-radio-button>
        <mat-radio-button name="level" value="mid" required
            >Mid
        </mat-radio-button>
        <mat-radio-button name="level" value="senior" required
            >Senior
        </mat-radio-button>
      </mat-radio-group>
      <br />
      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="employeeForm.invalid"
        >Add
      </button>      
    </form>
  `,
  styles: `
    .mat-mdc-radio-button ~ .mat-mdc-radio-button {
      margin-left: 16px;
    }
    .mat-mdc-form-field {
      width: 100%;
    }
  `
})
export class EmployeeFormComponent {
  initialState = input<Employee>();

  @Output()
  formValuesChanged = new EventEmitter<Employee>();

  @Output() formSubmitted = new EventEmitter<Employee>();

  employeeForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)], ],
    position: ['', [Validators.required, Validators.minLength(5)]],
    level: ['junior', [Validators.required]]
  });

  constructor (private formBuilder: FormBuilder) {
    effect(() => {
      this.employeeForm.setValue({
        name: this.initialState()?.name || '',
        position: this.initialState()?.position || '',
        level: this.initialState()?.level || ''
      });
    });
  }

  get name () {
    return this.employeeForm.get('name')!;
  }

  get position () {
    return this.employeeForm.get('position')!;
  }

  get level () {
    return this.employeeForm.get('level')!;
  }

  submitForm () {
    this.formSubmitted.emit(this.employeeForm.value as Employee);
  }

}
