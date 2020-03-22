import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEmployeeStyle, EmployeeStyle } from 'app/shared/model/employee-style.model';
import { EmployeeStyleService } from './employee-style.service';

@Component({
  selector: 'jhi-employee-style-update',
  templateUrl: './employee-style-update.component.html'
})
export class EmployeeStyleUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    employeeStyle: []
  });

  constructor(protected employeeStyleService: EmployeeStyleService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employeeStyle }) => {
      this.updateForm(employeeStyle);
    });
  }

  updateForm(employeeStyle: IEmployeeStyle): void {
    this.editForm.patchValue({
      id: employeeStyle.id,
      employeeStyle: employeeStyle.employeeStyle
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const employeeStyle = this.createFromForm();
    if (employeeStyle.id !== undefined) {
      this.subscribeToSaveResponse(this.employeeStyleService.update(employeeStyle));
    } else {
      this.subscribeToSaveResponse(this.employeeStyleService.create(employeeStyle));
    }
  }

  private createFromForm(): IEmployeeStyle {
    return {
      ...new EmployeeStyle(),
      id: this.editForm.get(['id'])!.value,
      employeeStyle: this.editForm.get(['employeeStyle'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployeeStyle>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
