import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOffer } from 'app/shared/model/offer.model';

@Component({
  selector: 'jhi-offer-detail',
  templateUrl: './offer-detail.component.html'
})
export class OfferDetailComponent implements OnInit {
  offer: IOffer | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ offer }) => (this.offer = offer));
  }

  previousState(): void {
    window.history.back();
  }
}
