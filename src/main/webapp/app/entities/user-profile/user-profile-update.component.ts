import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IUserProfile, UserProfile } from 'app/shared/model/user-profile.model';
import { UserProfileService } from './user-profile.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IInterest } from 'app/shared/model/interest.model';
import { InterestService } from 'app/entities/interest/interest.service';
import { IWorkingStyle } from 'app/shared/model/working-style.model';
import { WorkingStyleService } from 'app/entities/working-style/working-style.service';
import { IProfessionalExperience } from 'app/shared/model/professional-experience.model';
import { ProfessionalExperienceService } from 'app/entities/professional-experience/professional-experience.service';
import { IEmployeeStyle } from 'app/shared/model/employee-style.model';
import { EmployeeStyleService } from 'app/entities/employee-style/employee-style.service';

type SelectableEntity = IInterest | IWorkingStyle | IProfessionalExperience | IEmployeeStyle;

@Component({
  selector: 'jhi-user-profile-update',
  templateUrl: './user-profile-update.component.html'
})
export class UserProfileUpdateComponent implements OnInit {
  isSaving = false;
  interests: IInterest[] = [];
  workingstyles: IWorkingStyle[] = [];
  professionalexperiences: IProfessionalExperience[] = [];
  employeestyles: IEmployeeStyle[] = [];

  editForm = this.fb.group({
    id: [],
    firstName: [],
    lastName: [],
    address: [],
    experienceInYears: [],
    aboutMe: [],
    profilePicture: [],
    profilePictureContentType: [],
    telephoneLong: [],
    interests: [],
    workingStyles: [],
    professionalExperiences: [],
    employeeStyles: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected userProfileService: UserProfileService,
    protected interestService: InterestService,
    protected workingStyleService: WorkingStyleService,
    protected professionalExperienceService: ProfessionalExperienceService,
    protected employeeStyleService: EmployeeStyleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userProfile }) => {
      this.updateForm(userProfile);

      this.interestService.query().subscribe((res: HttpResponse<IInterest[]>) => (this.interests = res.body || []));

      this.workingStyleService.query().subscribe((res: HttpResponse<IWorkingStyle[]>) => (this.workingstyles = res.body || []));

      this.professionalExperienceService
        .query()
        .subscribe((res: HttpResponse<IProfessionalExperience[]>) => (this.professionalexperiences = res.body || []));

      this.employeeStyleService.query().subscribe((res: HttpResponse<IEmployeeStyle[]>) => (this.employeestyles = res.body || []));
    });
  }

  updateForm(userProfile: IUserProfile): void {
    this.editForm.patchValue({
      id: userProfile.id,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      address: userProfile.address,
      experienceInYears: userProfile.experienceInYears,
      aboutMe: userProfile.aboutMe,
      profilePicture: userProfile.profilePicture,
      profilePictureContentType: userProfile.profilePictureContentType,
      telephoneLong: userProfile.telephoneLong,
      interests: userProfile.interests,
      workingStyles: userProfile.workingStyles,
      professionalExperiences: userProfile.professionalExperiences,
      employeeStyles: userProfile.employeeStyles
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('wirvsvirusApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userProfile = this.createFromForm();
    if (userProfile.id !== undefined) {
      this.subscribeToSaveResponse(this.userProfileService.update(userProfile));
    } else {
      this.subscribeToSaveResponse(this.userProfileService.create(userProfile));
    }
  }

  private createFromForm(): IUserProfile {
    return {
      ...new UserProfile(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      address: this.editForm.get(['address'])!.value,
      experienceInYears: this.editForm.get(['experienceInYears'])!.value,
      aboutMe: this.editForm.get(['aboutMe'])!.value,
      profilePictureContentType: this.editForm.get(['profilePictureContentType'])!.value,
      profilePicture: this.editForm.get(['profilePicture'])!.value,
      telephoneLong: this.editForm.get(['telephoneLong'])!.value,
      interests: this.editForm.get(['interests'])!.value,
      workingStyles: this.editForm.get(['workingStyles'])!.value,
      professionalExperiences: this.editForm.get(['professionalExperiences'])!.value,
      employeeStyles: this.editForm.get(['employeeStyles'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserProfile>>): void {
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
