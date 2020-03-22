import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IOffer, Offer } from 'app/shared/model/offer.model';
import { OfferService } from './offer.service';
import { ICompany } from 'app/shared/model/company.model';
import { CompanyService } from 'app/entities/company/company.service';
import { IWorkingStyle } from 'app/shared/model/working-style.model';
import { WorkingStyleService } from 'app/entities/working-style/working-style.service';
import { IProfessionalExperience } from 'app/shared/model/professional-experience.model';
import { ProfessionalExperienceService } from 'app/entities/professional-experience/professional-experience.service';
import { IEmployeeStyle } from 'app/shared/model/employee-style.model';
import { EmployeeStyleService } from 'app/entities/employee-style/employee-style.service';

type SelectableEntity = ICompany | IWorkingStyle | IProfessionalExperience | IEmployeeStyle;

@Component({
  selector: 'jhi-offer-update',
  templateUrl: './offer-update.component.html'
})
export class OfferUpdateComponent implements OnInit {
  isSaving = false;
  companies: ICompany[] = [];
  workingstyles: IWorkingStyle[] = [];
  professionalexperiences: IProfessionalExperience[] = [];
  employeestyles: IEmployeeStyle[] = [];

  editForm = this.fb.group({
    id: [],
    title: [],
    address: [],
    description: [],
    telephoneLong: [],
    companies: [],
    workingStyles: [],
    professionalExperiences: [],
    employeeStyles: []
  });

  constructor(
    protected offerService: OfferService,
    protected companyService: CompanyService,
    protected workingStyleService: WorkingStyleService,
    protected professionalExperienceService: ProfessionalExperienceService,
    protected employeeStyleService: EmployeeStyleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ offer }) => {
      this.updateForm(offer);

      this.companyService.query().subscribe((res: HttpResponse<ICompany[]>) => (this.companies = res.body || []));

      this.workingStyleService.query().subscribe((res: HttpResponse<IWorkingStyle[]>) => (this.workingstyles = res.body || []));

      this.professionalExperienceService
        .query()
        .subscribe((res: HttpResponse<IProfessionalExperience[]>) => (this.professionalexperiences = res.body || []));

      this.employeeStyleService.query().subscribe((res: HttpResponse<IEmployeeStyle[]>) => (this.employeestyles = res.body || []));
    });
  }

  updateForm(offer: IOffer): void {
    this.editForm.patchValue({
      id: offer.id,
      title: offer.title,
      address: offer.address,
      description: offer.description,
      telephoneLong: offer.telephoneLong,
      companies: offer.companies,
      workingStyles: offer.workingStyles,
      professionalExperiences: offer.professionalExperiences,
      employeeStyles: offer.employeeStyles
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const offer = this.createFromForm();
    if (offer.id !== undefined) {
      this.subscribeToSaveResponse(this.offerService.update(offer));
    } else {
      this.subscribeToSaveResponse(this.offerService.create(offer));
    }
  }

  private createFromForm(): IOffer {
    return {
      ...new Offer(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      address: this.editForm.get(['address'])!.value,
      description: this.editForm.get(['description'])!.value,
      telephoneLong: this.editForm.get(['telephoneLong'])!.value,
      companies: this.editForm.get(['companies'])!.value,
      workingStyles: this.editForm.get(['workingStyles'])!.value,
      professionalExperiences: this.editForm.get(['professionalExperiences'])!.value,
      employeeStyles: this.editForm.get(['employeeStyles'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOffer>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: SelectableEntity[], option: SelectableEntity): SelectableEntity {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
