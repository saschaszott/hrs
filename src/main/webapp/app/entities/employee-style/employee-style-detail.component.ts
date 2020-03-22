import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmployeeStyle } from 'app/shared/model/employee-style.model';

@Component({
  selector: 'jhi-employee-style-detail',
  templateUrl: './employee-style-detail.component.html'
})
export class EmployeeStyleDetailComponent implements OnInit {
  employeeStyle: IEmployeeStyle | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employeeStyle }) => (this.employeeStyle = employeeStyle));
  }

  previousState(): void {
    window.history.back();
  }
}
