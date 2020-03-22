import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IWorkingStyle } from 'app/shared/model/working-style.model';
import { WorkingStyleService } from './working-style.service';
import { WorkingStyleDeleteDialogComponent } from './working-style-delete-dialog.component';

@Component({
  selector: 'jhi-working-style',
  templateUrl: './working-style.component.html'
})
export class WorkingStyleComponent implements OnInit, OnDestroy {
  workingStyles?: IWorkingStyle[];
  eventSubscriber?: Subscription;

  constructor(
    protected workingStyleService: WorkingStyleService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.workingStyleService.query().subscribe((res: HttpResponse<IWorkingStyle[]>) => (this.workingStyles = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInWorkingStyles();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IWorkingStyle): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInWorkingStyles(): void {
    this.eventSubscriber = this.eventManager.subscribe('workingStyleListModification', () => this.loadAll());
  }

  delete(workingStyle: IWorkingStyle): void {
    const modalRef = this.modalService.open(WorkingStyleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.workingStyle = workingStyle;
  }
}
