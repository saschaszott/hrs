import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmployeeStyle } from 'app/shared/model/employee-style.model';
import { EmployeeStyleService } from './employee-style.service';

@Component({
  templateUrl: './employee-style-delete-dialog.component.html'
})
export class EmployeeStyleDeleteDialogComponent {
  employeeStyle?: IEmployeeStyle;

  constructor(
    protected employeeStyleService: EmployeeStyleService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.employeeStyleService.delete(id).subscribe(() => {
      this.eventManager.broadcast('employeeStyleListModification');
      this.activeModal.close();
    });
  }
}
