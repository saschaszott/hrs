import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompanyOfferPageComponent } from './company-offer-page/company-offer-page.component';
import { UserWelcomePageComponent } from './user-welcome-page/user-welcome-page.component';
import { UserHelpHowPageComponent } from './user-help-how-page/user-help-how-page.component';
import { UserProfileCreatedPageComponent } from './user-profile-created-page/user-profile-created-page.component';
import { UserHelpWhenPageComponent } from './user-help-when-page/user-help-when-page.component';
import { CompanySearchPageComponent } from './company-search-page/company-search-page.component';

const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'welcome'
  },
  {
    path: 'welcome',
    component: UserWelcomePageComponent,
    data: {
      authorities: [],
      pageTitle: 'Wer bist du?'
    }
  },
  {
    path: 'how',
    component: UserHelpHowPageComponent,
    data: {
      authorities: [],
      pageTitle: 'Wie kannst du helfen?'
    }
  },
  {
    path: 'when',
    component: UserHelpWhenPageComponent,
    data: {
      authorities: [],
      pageTitle: 'Wann kannst du helfen?'
    }
  },
  {
    path: 'created',
    component: UserProfileCreatedPageComponent,
    data: {
      authorities: [],
      pageTitle: 'Wann kannst du helfen?'
    }
  },
  {
    path: 'company-search',
    component: CompanySearchPageComponent,
    data: {
      authorities: [],
      pageTitle: 'Suche nach Stellen.'
    }
  },
  {
    path: 'company-offer/:id',
    component: CompanyOfferPageComponent,
    data: {
      authorities: [],
      pageTitle: 'Das sind die Angebote.'
    }
  }
];

@NgModule({
  imports: [RouterModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
