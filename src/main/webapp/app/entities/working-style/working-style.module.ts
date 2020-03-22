import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WirvsvirusSharedModule } from 'app/shared/shared.module';
import { WorkingStyleComponent } from './working-style.component';
import { WorkingStyleDetailComponent } from './working-style-detail.component';
import { WorkingStyleUpdateComponent } from './working-style-update.component';
import { WorkingStyleDeleteDialogComponent } from './working-style-delete-dialog.component';
import { workingStyleRoute } from './working-style.route';

@NgModule({
  imports: [WirvsvirusSharedModule, RouterModule.forChild(workingStyleRoute)],
  declarations: [WorkingStyleComponent, WorkingStyleDetailComponent, WorkingStyleUpdateComponent, WorkingStyleDeleteDialogComponent],
  entryComponents: [WorkingStyleDeleteDialogComponent]
})
export class WirvsvirusWorkingStyleModule {}
