import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'user-profile',
        loadChildren: () => import('./user-profile/user-profile.module').then(m => m.WirvsvirusUserProfileModule)
      },
      {
        path: 'interest',
        loadChildren: () => import('./interest/interest.module').then(m => m.WirvsvirusInterestModule)
      },
      {
        path: 'offer',
        loadChildren: () => import('./offer/offer.module').then(m => m.WirvsvirusOfferModule)
      },
      {
        path: 'company',
        loadChildren: () => import('./company/company.module').then(m => m.WirvsvirusCompanyModule)
      },
      {
        path: 'employee-style',
        loadChildren: () => import('./employee-style/employee-style.module').then(m => m.WirvsvirusEmployeeStyleModule)
      },
      {
        path: 'professional-experience',
        loadChildren: () =>
          import('./professional-experience/professional-experience.module').then(m => m.WirvsvirusProfessionalExperienceModule)
      },
      {
        path: 'working-style',
        loadChildren: () => import('./working-style/working-style.module').then(m => m.WirvsvirusWorkingStyleModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class WirvsvirusEntityModule {}
