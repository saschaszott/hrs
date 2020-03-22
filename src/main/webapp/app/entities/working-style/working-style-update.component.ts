import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IWorkingStyle, WorkingStyle } from 'app/shared/model/working-style.model';
import { WorkingStyleService } from './working-style.service';

@Component({
  selector: 'jhi-working-style-update',
  templateUrl: './working-style-update.component.html'
})
export class WorkingStyleUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    workingStyle: []
  });

  constructor(protected workingStyleService: WorkingStyleService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ workingStyle }) => {
      this.updateForm(workingStyle);
    });
  }

  updateForm(workingStyle: IWorkingStyle): void {
    this.editForm.patchValue({
      id: workingStyle.id,
      workingStyle: workingStyle.workingStyle
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const workingStyle = this.createFromForm();
    if (workingStyle.id !== undefined) {
      this.subscribeToSaveResponse(this.workingStyleService.update(workingStyle));
    } else {
      this.subscribeToSaveResponse(this.workingStyleService.create(workingStyle));
    }
  }

  private createFromForm(): IWorkingStyle {
    return {
      ...new WorkingStyle(),
      id: this.editForm.get(['id'])!.value,
      workingStyle: this.editForm.get(['workingStyle'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWorkingStyle>>): void {
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
