import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProfessionalExperience } from 'app/shared/model/professional-experience.model';
import { ProfessionalExperienceService } from './professional-experience.service';

@Component({
  templateUrl: './professional-experience-delete-dialog.component.html'
})
export class ProfessionalExperienceDeleteDialogComponent {
  professionalExperience?: IProfessionalExperience;

  constructor(
    protected professionalExperienceService: ProfessionalExperienceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.professionalExperienceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('professionalExperienceListModification');
      this.activeModal.close();
    });
  }
}
