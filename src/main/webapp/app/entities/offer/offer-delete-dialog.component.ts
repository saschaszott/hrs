import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOffer } from 'app/shared/model/offer.model';
import { OfferService } from './offer.service';

@Component({
  templateUrl: './offer-delete-dialog.component.html'
})
export class OfferDeleteDialogComponent {
  offer?: IOffer;

  constructor(protected offerService: OfferService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.offerService.delete(id).subscribe(() => {
      this.eventManager.broadcast('offerListModification');
      this.activeModal.close();
    });
  }
}
