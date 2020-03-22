import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProfessionalExperience } from 'app/shared/model/professional-experience.model';
import { ProfessionalExperienceService } from './professional-experience.service';
import { ProfessionalExperienceDeleteDialogComponent } from './professional-experience-delete-dialog.component';

@Component({
  selector: 'jhi-professional-experience',
  templateUrl: './professional-experience.component.html'
})
export class ProfessionalExperienceComponent implements OnInit, OnDestroy {
  professionalExperiences?: IProfessionalExperience[];
  eventSubscriber?: Subscription;

  constructor(
    protected professionalExperienceService: ProfessionalExperienceService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.professionalExperienceService
      .query()
      .subscribe((res: HttpResponse<IProfessionalExperience[]>) => (this.professionalExperiences = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProfessionalExperiences();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProfessionalExperience): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProfessionalExperiences(): void {
    this.eventSubscriber = this.eventManager.subscribe('professionalExperienceListModification', () => this.loadAll());
  }

  delete(professionalExperience: IProfessionalExperience): void {
    const modalRef = this.modalService.open(ProfessionalExperienceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.professionalExperience = professionalExperience;
  }
}
