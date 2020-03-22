import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProfessionalExperience, ProfessionalExperience } from 'app/shared/model/professional-experience.model';
import { ProfessionalExperienceService } from './professional-experience.service';
import { ProfessionalExperienceComponent } from './professional-experience.component';
import { ProfessionalExperienceDetailComponent } from './professional-experience-detail.component';
import { ProfessionalExperienceUpdateComponent } from './professional-experience-update.component';

@Injectable({ providedIn: 'root' })
export class ProfessionalExperienceResolve implements Resolve<IProfessionalExperience> {
  constructor(private service: ProfessionalExperienceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProfessionalExperience> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((professionalExperience: HttpResponse<ProfessionalExperience>) => {
          if (professionalExperience.body) {
            return of(professionalExperience.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProfessionalExperience());
  }
}

export const professionalExperienceRoute: Routes = [
  {
    path: '',
    component: ProfessionalExperienceComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wirvsvirusApp.professionalExperience.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProfessionalExperienceDetailComponent,
    resolve: {
      professionalExperience: ProfessionalExperienceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wirvsvirusApp.professionalExperience.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProfessionalExperienceUpdateComponent,
    resolve: {
      professionalExperience: ProfessionalExperienceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wirvsvirusApp.professionalExperience.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProfessionalExperienceUpdateComponent,
    resolve: {
      professionalExperience: ProfessionalExperienceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wirvsvirusApp.professionalExperience.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
