import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWorkingStyle } from 'app/shared/model/working-style.model';
import { WorkingStyleService } from './working-style.service';

@Component({
  templateUrl: './working-style-delete-dialog.component.html'
})
export class WorkingStyleDeleteDialogComponent {
  workingStyle?: IWorkingStyle;

  constructor(
    protected workingStyleService: WorkingStyleService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.workingStyleService.delete(id).subscribe(() => {
      this.eventManager.broadcast('workingStyleListModification');
      this.activeModal.close();
    });
  }
}
