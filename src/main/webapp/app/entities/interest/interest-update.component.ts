import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IInterest, Interest } from 'app/shared/model/interest.model';
import { InterestService } from './interest.service';

@Component({
  selector: 'jhi-interest-update',
  templateUrl: './interest-update.component.html'
})
export class InterestUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    interest: []
  });

  constructor(protected interestService: InterestService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ interest }) => {
      this.updateForm(interest);
    });
  }

  updateForm(interest: IInterest): void {
    this.editForm.patchValue({
      id: interest.id,
      interest: interest.interest
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const interest = this.createFromForm();
    if (interest.id !== undefined) {
      this.subscribeToSaveResponse(this.interestService.update(interest));
    } else {
      this.subscribeToSaveResponse(this.interestService.create(interest));
    }
  }

  private createFromForm(): IInterest {
    return {
      ...new Interest(),
      id: this.editForm.get(['id'])!.value,
      interest: this.editForm.get(['interest'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInterest>>): void {
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
