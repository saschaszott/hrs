// Should be ok because this is just a Mock.
/* eslint-disable no-console */

import { Injectable } from '@angular/core';
import { CompanyProfile } from '../types/company-profile';
import { of, Observable } from 'rxjs';
import { SAMPLE_OFFERS, SAMPLE_COMPANY_PROFILE } from './mocks';
import { Offer } from '../types';

@Injectable({
  providedIn: 'root'
})
export class CompanyServiceMock {
  public getProfile(companyId: string): Observable<CompanyProfile> {
    console.log(`Get profile for company with id '${companyId}'.`);
    return of(SAMPLE_COMPANY_PROFILE);
  }

  public getOffers(companyId: string): Observable<Offer[]> {
    console.log(`Get offers for company with id '${companyId}'.`);
    return of(SAMPLE_OFFERS);
  }

  public joinOffer(offerId: string, userId: string): Observable<Offer> {
    console.log(`User with id '${userId}' will join the '${offerId} with id '${offerId}'.`);
    return of(SAMPLE_OFFERS[0]);
  }
}
