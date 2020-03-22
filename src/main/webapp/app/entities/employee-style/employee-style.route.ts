import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEmployeeStyle, EmployeeStyle } from 'app/shared/model/employee-style.model';
import { EmployeeStyleService } from './employee-style.service';
import { EmployeeStyleComponent } from './employee-style.component';
import { EmployeeStyleDetailComponent } from './employee-style-detail.component';
import { EmployeeStyleUpdateComponent } from './employee-style-update.component';

@Injectable({ providedIn: 'root' })
export class EmployeeStyleResolve implements Resolve<IEmployeeStyle> {
  constructor(private service: EmployeeStyleService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmployeeStyle> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((employeeStyle: HttpResponse<EmployeeStyle>) => {
          if (employeeStyle.body) {
            return of(employeeStyle.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EmployeeStyle());
  }
}

export const employeeStyleRoute: Routes = [
  {
    path: '',
    component: EmployeeStyleComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wirvsvirusApp.employeeStyle.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EmployeeStyleDetailComponent,
    resolve: {
      employeeStyle: EmployeeStyleResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wirvsvirusApp.employeeStyle.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EmployeeStyleUpdateComponent,
    resolve: {
      employeeStyle: EmployeeStyleResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wirvsvirusApp.employeeStyle.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EmployeeStyleUpdateComponent,
    resolve: {
      employeeStyle: EmployeeStyleResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wirvsvirusApp.employeeStyle.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
