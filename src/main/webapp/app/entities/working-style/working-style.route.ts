import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IWorkingStyle, WorkingStyle } from 'app/shared/model/working-style.model';
import { WorkingStyleService } from './working-style.service';
import { WorkingStyleComponent } from './working-style.component';
import { WorkingStyleDetailComponent } from './working-style-detail.component';
import { WorkingStyleUpdateComponent } from './working-style-update.component';

@Injectable({ providedIn: 'root' })
export class WorkingStyleResolve implements Resolve<IWorkingStyle> {
  constructor(private service: WorkingStyleService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWorkingStyle> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((workingStyle: HttpResponse<WorkingStyle>) => {
          if (workingStyle.body) {
            return of(workingStyle.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new WorkingStyle());
  }
}

export const workingStyleRoute: Routes = [
  {
    path: '',
    component: WorkingStyleComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wirvsvirusApp.workingStyle.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: WorkingStyleDetailComponent,
    resolve: {
      workingStyle: WorkingStyleResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wirvsvirusApp.workingStyle.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: WorkingStyleUpdateComponent,
    resolve: {
      workingStyle: WorkingStyleResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wirvsvirusApp.workingStyle.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: WorkingStyleUpdateComponent,
    resolve: {
      workingStyle: WorkingStyleResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wirvsvirusApp.workingStyle.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
