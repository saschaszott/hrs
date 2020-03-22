import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'app/services/company.service';
import { Observable } from 'rxjs';
import { CompanyProfile, Offer } from 'app/types';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'jhi-company-offer-page',
  templateUrl: './company-offer-page.component.html',
  styleUrls: ['./company-offer-page.component.scss']
})
export class CompanyOfferPageComponent implements OnInit {
  public profile$: Observable<CompanyProfile> | undefined;
  public offers$: Observable<Offer[]> | undefined;

  constructor(private service: CompanyService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.profile$ = this.route.paramMap.pipe(
      map(params => params.get('id') as string),
      switchMap(id => this.service.getProfile(id))
    );

    this.offers$ = this.route.paramMap.pipe(
      map(params => params.get('id') as string),
      switchMap(id => this.service.getOffers(id))
    );
  }
}
