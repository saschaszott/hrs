import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IInterest, Interest } from 'app/shared/model/interest.model';
import { InterestService } from './interest.service';
import { InterestComponent } from './interest.component';
import { InterestDetailComponent } from './interest-detail.component';
import { InterestUpdateComponent } from './interest-update.component';

@Injectable({ providedIn: 'root' })
export class InterestResolve implements Resolve<IInterest> {
  constructor(private service: InterestService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInterest> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((interest: HttpResponse<Interest>) => {
          if (interest.body) {
            return of(interest.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Interest());
  }
}

export const interestRoute: Routes = [
  {
    path: '',
    component: InterestComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wirvsvirusApp.interest.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: InterestDetailComponent,
    resolve: {
      interest: InterestResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wirvsvirusApp.interest.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: InterestUpdateComponent,
    resolve: {
      interest: InterestResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wirvsvirusApp.interest.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: InterestUpdateComponent,
    resolve: {
      interest: InterestResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wirvsvirusApp.interest.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
