import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WirvsvirusSharedModule } from 'app/shared/shared.module';
import { EmployeeStyleComponent } from './employee-style.component';
import { EmployeeStyleDetailComponent } from './employee-style-detail.component';
import { EmployeeStyleUpdateComponent } from './employee-style-update.component';
import { EmployeeStyleDeleteDialogComponent } from './employee-style-delete-dialog.component';
import { employeeStyleRoute } from './employee-style.route';

@NgModule({
  imports: [WirvsvirusSharedModule, RouterModule.forChild(employeeStyleRoute)],
  declarations: [EmployeeStyleComponent, EmployeeStyleDetailComponent, EmployeeStyleUpdateComponent, EmployeeStyleDeleteDialogComponent],
  entryComponents: [EmployeeStyleDeleteDialogComponent]
})
export class WirvsvirusEmployeeStyleModule {}
