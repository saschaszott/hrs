import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IUserProfile } from 'app/shared/model/user-profile.model';

@Component({
  selector: 'jhi-user-profile-detail',
  templateUrl: './user-profile-detail.component.html'
})
export class UserProfileDetailComponent implements OnInit {
  userProfile: IUserProfile | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userProfile }) => (this.userProfile = userProfile));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
