import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProfessionalExperience, ProfessionalExperience } from 'app/shared/model/professional-experience.model';
import { ProfessionalExperienceService } from './professional-experience.service';

@Component({
  selector: 'jhi-professional-experience-update',
  templateUrl: './professional-experience-update.component.html'
})
export class ProfessionalExperienceUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    professionalExperience: []
  });

  constructor(
    protected professionalExperienceService: ProfessionalExperienceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ professionalExperience }) => {
      this.updateForm(professionalExperience);
    });
  }

  updateForm(professionalExperience: IProfessionalExperience): void {
    this.editForm.patchValue({
      id: professionalExperience.id,
      professionalExperience: professionalExperience.professionalExperience
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const professionalExperience = this.createFromForm();
    if (professionalExperience.id !== undefined) {
      this.subscribeToSaveResponse(this.professionalExperienceService.update(professionalExperience));
    } else {
      this.subscribeToSaveResponse(this.professionalExperienceService.create(professionalExperience));
    }
  }

  private createFromForm(): IProfessionalExperience {
    return {
      ...new ProfessionalExperience(),
      id: this.editForm.get(['id'])!.value,
      professionalExperience: this.editForm.get(['professionalExperience'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfessionalExperience>>): void {
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
