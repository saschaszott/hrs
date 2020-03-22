import { Route } from '@angular/router';

import { HomeComponent } from './home.component';

export const HOME_ROUTE: Route = {
  path: '',
  redirectTo: '/pages/welcome',
  pathMatch: 'full'
  /*component: HomeComponent,
  data: {
    authorities: [],
    pageTitle: 'home.title'
  }*/
};
