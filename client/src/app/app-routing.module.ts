import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeesListComponent} from "./employees-list/employees-list.component";

export const routes: Routes = [
  { path: '', component: EmployeesListComponent, title: 'Employees List'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
