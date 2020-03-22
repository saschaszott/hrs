import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInterest } from 'app/shared/model/interest.model';
import { InterestService } from './interest.service';
import { InterestDeleteDialogComponent } from './interest-delete-dialog.component';

@Component({
  selector: 'jhi-interest',
  templateUrl: './interest.component.html'
})
export class InterestComponent implements OnInit, OnDestroy {
  interests?: IInterest[];
  eventSubscriber?: Subscription;

  constructor(protected interestService: InterestService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.interestService.query().subscribe((res: HttpResponse<IInterest[]>) => (this.interests = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInInterests();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IInterest): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInInterests(): void {
    this.eventSubscriber = this.eventManager.subscribe('interestListModification', () => this.loadAll());
  }

  delete(interest: IInterest): void {
    const modalRef = this.modalService.open(InterestDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.interest = interest;
  }
}
