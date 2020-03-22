import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WirvsvirusSharedModule } from 'app/shared/shared.module';
import { CompanyComponent } from './company.component';
import { CompanyDetailComponent } from './company-detail.component';
import { CompanyUpdateComponent } from './company-update.component';
import { CompanyDeleteDialogComponent } from './company-delete-dialog.component';
import { companyRoute } from './company.route';

@NgModule({
  imports: [WirvsvirusSharedModule, RouterModule.forChild(companyRoute)],
  declarations: [CompanyComponent, CompanyDetailComponent, CompanyUpdateComponent, CompanyDeleteDialogComponent],
  entryComponents: [CompanyDeleteDialogComponent]
})
export class WirvsvirusCompanyModule {}
