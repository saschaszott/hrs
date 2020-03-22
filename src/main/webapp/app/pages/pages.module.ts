import { NgModule } from '@angular/core';

import { CompanyOfferPageComponent } from './company-offer-page/company-offer-page.component';
import { CompanyPageComponent } from './company-page/company-page.component';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import { PagesRoutingModule } from './pages-routing.module';
import { UserWelcomePageComponent } from './user-welcome-page/user-welcome-page.component';
import { UserHelpHowPageComponent } from './user-help-how-page/user-help-how-page.component';
import { UserHelpWhenPageComponent } from './user-help-when-page/user-help-when-page.component';
import { UserProfileCreatedPageComponent } from './user-profile-created-page/user-profile-created-page.component';
import { UserProfileCompetencesPageComponent } from './user-profile-competences-page/user-profile-competences-page.component';
import { MatchPageComponent } from './match-page/match-page.component';
import { CompanySearchPageComponent } from './company-search-page/company-search-page.component';
import { CommonModule } from '@angular/common';

const PAGES = [
  CompanyPageComponent,
  CompanyOfferPageComponent,
  UserProfilePageComponent,
  UserWelcomePageComponent,
  UserHelpHowPageComponent,
  UserHelpWhenPageComponent,
  UserProfileCreatedPageComponent,
  CompanySearchPageComponent,
  UserProfileCompetencesPageComponent,
  MatchPageComponent
];

@NgModule({
  imports: [CommonModule, PagesRoutingModule],
  declarations: [PAGES, CompanySearchPageComponent]
})
export class PagesModule {}
