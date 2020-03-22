import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEmployeeStyle } from 'app/shared/model/employee-style.model';
import { EmployeeStyleService } from './employee-style.service';
import { EmployeeStyleDeleteDialogComponent } from './employee-style-delete-dialog.component';

@Component({
  selector: 'jhi-employee-style',
  templateUrl: './employee-style.component.html'
})
export class EmployeeStyleComponent implements OnInit, OnDestroy {
  employeeStyles?: IEmployeeStyle[];
  eventSubscriber?: Subscription;

  constructor(
    protected employeeStyleService: EmployeeStyleService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.employeeStyleService.query().subscribe((res: HttpResponse<IEmployeeStyle[]>) => (this.employeeStyles = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEmployeeStyles();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEmployeeStyle): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEmployeeStyles(): void {
    this.eventSubscriber = this.eventManager.subscribe('employeeStyleListModification', () => this.loadAll());
  }

  delete(employeeStyle: IEmployeeStyle): void {
    const modalRef = this.modalService.open(EmployeeStyleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.employeeStyle = employeeStyle;
  }
}
