import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInterest } from 'app/shared/model/interest.model';
import { InterestService } from './interest.service';

@Component({
  templateUrl: './interest-delete-dialog.component.html'
})
export class InterestDeleteDialogComponent {
  interest?: IInterest;

  constructor(protected interestService: InterestService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.interestService.delete(id).subscribe(() => {
      this.eventManager.broadcast('interestListModification');
      this.activeModal.close();
    });
  }
}
