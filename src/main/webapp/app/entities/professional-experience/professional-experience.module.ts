import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WirvsvirusSharedModule } from 'app/shared/shared.module';
import { ProfessionalExperienceComponent } from './professional-experience.component';
import { ProfessionalExperienceDetailComponent } from './professional-experience-detail.component';
import { ProfessionalExperienceUpdateComponent } from './professional-experience-update.component';
import { ProfessionalExperienceDeleteDialogComponent } from './professional-experience-delete-dialog.component';
import { professionalExperienceRoute } from './professional-experience.route';

@NgModule({
  imports: [WirvsvirusSharedModule, RouterModule.forChild(professionalExperienceRoute)],
  declarations: [
    ProfessionalExperienceComponent,
    ProfessionalExperienceDetailComponent,
    ProfessionalExperienceUpdateComponent,
    ProfessionalExperienceDeleteDialogComponent
  ],
  entryComponents: [ProfessionalExperienceDeleteDialogComponent]
})
export class WirvsvirusProfessionalExperienceModule {}
